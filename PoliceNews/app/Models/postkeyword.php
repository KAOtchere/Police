<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class postkeyword extends Model
{
    use HasFactory;

    protected $table = "post_keywords";

    protected $fillable = [
        "post_id",
        "keyword_id"
    ];
}
