<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMTTestFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       /* Schema::create('mt_test_fields', function (Blueprint $table) {  
            //$table->bigIncrements('bigIncrements'); //   Auto-incrementing UNSIGNED BIGINT (primary key) equivalent column.
            //$table->bigInteger('bigInteger'); //   BIGINT equivalent column.
            $table->binary('binary'); //BLOB equivalent column.
            $table->boolean('boolean'); //  BOOLEAN equivalent column.
            $table->char('char', 100); // CHAR equivalent column with an optional length.
            $table->date('date'); //DATE equivalent column.
            $table->dateTime('dateTime'); //DATETIME equivalent column.
            $table->dateTimeTz('dateTimeTz'); //  DATETIME (with timezone) equivalent column.
            $table->decimal('decimal', 8, 2); //   DECIMAL equivalent column with a precision (total digits) and scale (decimal digits).
            $table->double('double', 8, 2); //DOUBLE equivalent column with a precision (total digits) and scale (decimal digits).
            $table->enum('enum', ['easy', 'hard']); //   ENUM equivalent column.
            $table->float('float', 8, 2); // FLOAT equivalent column with a precision (total digits) and scale (decimal digits).
            $table->geometry('geometry'); // GEOMETRY equivalent column.
            $table->geometryCollection('geometryCollection'); //   GEOMETRYCOLLECTION equivalent column.
            $table->increments('increments'); //  Auto-incrementing UNSIGNED INTEGER (primary key) equivalent column.
            $table->integer('integer'); //  INTEGER equivalent column.
            $table->ipAddress('ipAddress'); //  IP address equivalent column.
            //$table->json('json'); //   JSON equivalent column.
            //$table->jsonb('jsonb'); //  JSONB equivalent column.
            $table->lineString('lineString'); //   LINESTRING equivalent column.
            $table->longText('longText'); //   LONGTEXT equivalent column.
            $table->macAddress('macAddress'); //  MAC address equivalent column.
            //$table->mediumIncrements('mediumIncrements'); //Auto-incrementing UNSIGNED MEDIUMINT (primary key) equivalent column.
            $table->mediumInteger('mediumInteger'); //MEDIUMINT equivalent column.
            $table->mediumText('mediumText'); // MEDIUMTEXT equivalent column.
            $table->morphs('morphs'); //Adds taggable_id UNSIGNED BIGINT and  taggable_type VARCHAR equivalent columns.
            $table->multiLineString('multiLineString'); //  MULTILINESTRING equivalent column.
            $table->multiPoint('multiPoint'); //   MULTIPOINT equivalent column.
            $table->multiPolygon('multiPolygon'); // MULTIPOLYGON equivalent column.
            $table->nullableMorphs('nullableMorphs'); //Adds nullable versions of morphs() columns.
            //$table->nullableTimestamps(); //  Alias of timestamps() method.
            $table->point('point'); // POINT equivalent column.
            $table->polygon('polygon'); //  POLYGON equivalent column.
            $table->rememberToken(); //   Adds a nullable remember_token VARCHAR(100) equivalent column.
            //$table->smallIncrements('smallIncrements'); // Auto-incrementing UNSIGNED SMALLINT (primary key) equivalent column.
            $table->smallInteger('smallInteger'); // SMALLINT equivalent column.
            //$table->softDeletes(); // Adds a nullable deleted_at TIMESTAMP equivalent column for soft deletes.
            $table->softDeletesTz(); //   Adds a nullable deleted_at TIMESTAMP (with timezone) equivalent column for soft deletes.
            $table->string('name', 100); //   VARCHAR equivalent column with a optional length.
            $table->text('description'); //   TEXT equivalent column.
            $table->time('sunrise'); //   TIME equivalent column.
            $table->timeTz('timeTz'); // TIME (with timezone) equivalent column.
            $table->timestamp('added_on'); // TIMESTAMP equivalent column.
            $table->timestampTz('timestampTz'); //   TIMESTAMP (with timezone) equivalent column.
            //$table->timestamps(); //  Adds nullable created_at and updated_at TIMESTAMP equivalent columns.
            $table->timestampsTz(); //Adds nullable created_at and updated_at TIMESTAMP (with timezone) equivalent columns.
            //$table->tinyIncrements('tinyIncrements'); //  Auto-incrementing UNSIGNED TINYINT (primary key) equivalent column.
            $table->tinyInteger('tinyInteger'); //  TINYINT equivalent column.
            $table->unsignedBigInteger('unsignedBigInteger'); //   UNSIGNED BIGINT equivalent column.
            $table->unsignedDecimal('amount', 8, 2); //   UNSIGNED DECIMAL equivalent column with a precision (total digits) and scale (decimal digits).
            $table->unsignedInteger('unsignedInteger'); //  UNSIGNED INTEGER equivalent column.
            $table->unsignedMediumInteger('unsignedMediumInteger'); //UNSIGNED MEDIUMINT equivalent column.
            $table->unsignedSmallInteger('unsignedSmallInteger'); // UNSIGNED SMALLINT equivalent column.
            $table->unsignedTinyInteger('votes'); //  UNSIGNED TINYINT equivalent column.
            $table->uuid('uuid'); //UUID equivalent column.
            $table->year('birth_year');
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Schema::dropIfExists('mt_test_fields');
    }
}
