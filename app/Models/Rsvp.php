<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rsvp extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact',
        'attending',
        'guest_count',
        'events',
        'message',
    ];

    protected $casts = [
        'attending' => 'boolean',
        'guest_count' => 'integer',
        'events' => 'array',
    ];
}
