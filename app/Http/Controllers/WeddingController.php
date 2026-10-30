<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Wish;
use App\Models\Rsvp;
use App\Models\WeddingContent;

class WeddingController extends Controller
{
    /**
     * Render the main wedding page with genuine SSR support.
     */
    public function index()
    {
        $wishes = Wish::where('approved', true)
            ->latest()
            ->get(['id', 'name', 'message', 'created_at']);

        $siteContent = WeddingContent::getAllContent();

        return Inertia::render('Index', [
            'initialWishes' => $wishes,
            'siteContent' => $siteContent,
        ]);
    }

    /**
     * Submit a guest wish / blessing.
     */
    public function storeWish(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:60',
            'message' => 'required|string|min:3|max:500',
        ]);

        $wish = Wish::create([
            'name' => trim($validated['name']),
            'message' => trim($validated['message']),
            'approved' => true,
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Thank you for your blessings!',
                'wish' => $wish,
            ]);
        }

        return redirect()->back()->with('success', 'Thank you! Your wish has been recorded.');
    }

    /**
     * Submit an RSVP response.
     */
    public function storeRsvp(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:60',
            'contact' => 'required|string|min:4|max:80',
            'attending' => 'required|boolean',
            'guest_count' => 'nullable|integer|min:1|max:20',
            'events' => 'nullable|array',
            'message' => 'nullable|string|max:500',
        ]);

        $rsvp = Rsvp::updateOrCreate(
            ['contact' => trim($validated['contact'])],
            [
                'name' => trim($validated['name']),
                'attending' => (bool)$validated['attending'],
                'guest_count' => $validated['guest_count'] ?? 1,
                'events' => $validated['events'] ?? [],
                'message' => isset($validated['message']) ? trim($validated['message']) : null,
            ]
        );

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'updated' => $rsvp->wasRecentlyCreated === false,
                'message' => $rsvp->attending ? 'See you at the wedding!' : 'Thank you for letting us know.',
            ]);
        }

        return redirect()->back()->with('success', 'Your RSVP has been saved.');
    }
}
