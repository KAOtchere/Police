<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->unsignedBigInteger('media_id');
            $table->unsignedBigInteger('pub_id');
            $table->text('summary');
            $table->date('publication_date');
            $table->float('positive');
            $table->float('negative');
            $table->float('neutral');

            $table->foreign('media_id')->references('id')->on('media');
            $table->foreign('pub_id')->references('id')->on('publication_names');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
