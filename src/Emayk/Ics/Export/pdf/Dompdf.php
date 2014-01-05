<?php namespace Emayk\Ics\Export\Pdf;
use Barryvdh\DomPDF\PDF as BarryvdhPdf;

/**
* Export PDF with Module Barry Pdf
*/
class DomPdf extends BarryvdhPdf implements PdfInterface
{
	public function method(){
		return 'Dom PDF with Helper Barryvdh';
	}
}

