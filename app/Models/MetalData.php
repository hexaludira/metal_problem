<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetalData extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'detail',
        'location',
        'status',
        'remark'
    ]
}
