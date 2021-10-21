<?php

namespace Modules\MT\Models;

use Illuminate\Database\Eloquent\Model;

class MtTaxable extends Model {
 
	protected $fillable = [
		'mt_taxonomy_id',
		'mt_taxable_type'
		'mt_taxable_id',
	];

}
