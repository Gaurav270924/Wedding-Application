<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Wish;
use App\Models\Rsvp;
use App\Models\WeddingContent;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminController extends Controller
{
    /**
     * Common statistics calculation.
     */
    protected function getStats()
    {
        $rsvps = Rsvp::all();
        $wishes = Wish::all();
        $content = WeddingContent::getAllContent();

        $attendingRsvps = $rsvps->where('attending', true);
        $declinedRsvps = $rsvps->where('attending', false);

        $eventsList = $content['events'] ?? [];
        $eventsCount = [];
        foreach ($eventsList as $evt) {
            if (!empty($evt['title'])) {
                $eventsCount[$evt['title']] = 0;
            }
        }

        // Fallbacks if events list is empty
        if (empty($eventsCount)) {
            $eventsCount = [
                'Mehendi' => 0,
                'Haldi' => 0,
                'Sangeet' => 0,
                'The Wedding' => 0,
            ];
        }

        foreach ($attendingRsvps as $rsvp) {
            $guestCount = max(1, $rsvp->guest_count);
            $selectedEvents = is_array($rsvp->events) ? $rsvp->events : [];
            foreach ($selectedEvents as $event) {
                if (isset($eventsCount[$event])) {
                    $eventsCount[$event] += $guestCount;
                }
            }
        }

        return [
            'total_rsvps' => $rsvps->count(),
            'attending_count' => $attendingRsvps->count(),
            'declined_count' => $declinedRsvps->count(),
            'total_guests' => $attendingRsvps->sum('guest_count'),
            'total_wishes' => $wishes->count(),
            'approved_wishes' => $wishes->where('approved', true)->count(),
            'pending_wishes' => $wishes->where('approved', false)->count(),
            'events_breakdown' => $eventsCount,
        ];
    }

    /**
     * Admin Dashboard Overview.
     */
    public function dashboard()
    {
        $stats = $this->getStats();
        $recentRsvps = Rsvp::latest()->take(5)->get();
        $recentWishes = Wish::latest()->take(6)->get();
        $content = WeddingContent::getAllContent();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentRsvps' => $recentRsvps,
            'recentWishes' => $recentWishes,
            'wedding' => $content['wedding'] ?? null,
        ]);
    }

    /**
     * Website Content Editor Page.
     */
    public function content(Request $request)
    {
        $content = WeddingContent::getAllContent();

        return Inertia::render('Admin/ContentEditor', [
            'content' => $content,
        ]);
    }

    /**
     * Save updated website content.
     */
    public function saveContent(Request $request)
    {
        $section = $request->input('section');
        $data = $request->input('data');

        if ($section && is_array($data)) {
            WeddingContent::setSection($section, $data);
            return redirect()->back()->with('success', ucfirst($section) . ' section updated successfully.');
        }

        if ($request->has('sections') && is_array($request->input('sections'))) {
            foreach ($request->input('sections') as $sec => $secData) {
                if (is_array($secData)) {
                    WeddingContent::setSection($sec, $secData);
                }
            }
            return redirect()->back()->with('success', 'Website content saved successfully.');
        }

        return redirect()->back()->with('error', 'Invalid content payload.');
    }

    /**
     * Reset content to original defaults.
     */
    public function resetContent(Request $request)
    {
        $section = $request->input('section');
        $defaults = WeddingContent::getDefaults();

        if ($section && isset($defaults[$section])) {
            WeddingContent::setSection($section, $defaults[$section]);
            return redirect()->back()->with('success', ucfirst($section) . ' restored to defaults.');
        } elseif ($request->input('all')) {
            foreach ($defaults as $sec => $data) {
                WeddingContent::setSection($sec, $data);
            }
            return redirect()->back()->with('success', 'All website content restored to defaults.');
        }

        return redirect()->back()->with('error', 'Section not recognized.');
    }

    /**
     * Upload an image or media asset.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,webp,gif,svg,mp3,wav|max:20480',
        ]);

        $file = $request->file('file');
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads'), $filename);

        return response()->json([
            'success' => true,
            'url' => '/uploads/' . $filename,
        ]);
    }

    /**
     * RSVPs Management Page.
     */
    public function rsvps(Request $request)
    {
        $stats = $this->getStats();
        $rsvps = Rsvp::latest()->get();

        return Inertia::render('Admin/Rsvps', [
            'stats' => $stats,
            'rsvps' => $rsvps,
        ]);
    }

    /**
     * Wishes Moderation Page.
     */
    public function wishes(Request $request)
    {
        $stats = $this->getStats();
        $wishes = Wish::latest()->get();

        return Inertia::render('Admin/Wishes', [
            'stats' => $stats,
            'wishes' => $wishes,
        ]);
    }

    /**
     * Wedding Event Details Page.
     */
    public function events()
    {
        $stats = $this->getStats();
        $content = WeddingContent::getAllContent();

        return Inertia::render('Admin/Events', [
            'stats' => $stats,
            'events' => $content['events'] ?? [],
            'venue' => $content['venue'] ?? [],
        ]);
    }

    /**
     * Toggle wish approval status.
     */
    public function toggleWishApproval($id)
    {
        $wish = Wish::findOrFail($id);
        $wish->approved = !$wish->approved;
        $wish->save();

        return redirect()->back()->with('success', 'Wish status updated successfully.');
    }

    /**
     * Delete a wish.
     */
    public function deleteWish($id)
    {
        $wish = Wish::findOrFail($id);
        $wish->delete();

        return redirect()->back()->with('success', 'Wish deleted.');
    }

    /**
     * Delete an RSVP.
     */
    public function deleteRsvp($id)
    {
        $rsvp = Rsvp::findOrFail($id);
        $rsvp->delete();

        return redirect()->back()->with('success', 'RSVP record deleted.');
    }

    /**
     * Export all RSVPs as CSV.
     */
    public function exportRsvps(): StreamedResponse
    {
        $fileName = 'wedding_rsvps_' . date('Y-m-d') . '.csv';
        $rsvps = Rsvp::orderBy('id', 'desc')->get();

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($rsvps) {
            $handle = fopen('php://output', 'w');
            fputs($handle, "\xEF\xBB\xBF");
            fputcsv($handle, ['ID', 'Name', 'Contact', 'Attending', 'Guests Count', 'Events Attending', 'Message', 'Submitted At']);

            foreach ($rsvps as $r) {
                fputcsv($handle, [
                    $r->id,
                    $r->name,
                    $r->contact,
                    $r->attending ? 'Yes (Accept)' : 'No (Decline)',
                    $r->attending ? $r->guest_count : 0,
                    is_array($r->events) ? implode(', ', $r->events) : '',
                    $r->message,
                    $r->created_at ? $r->created_at->format('Y-m-d H:i') : '',
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
