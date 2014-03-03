<style>

@media screen
{
p.bodyText {font-family:verdana, arial, sans-serif;}
}

@media print
{
p.bodyText {font-family:georgia, times, serif;}
}

@media screen, print
{
p.bodyText {font-size:10pt}
}

</style>

<h1>Nomor PO : {{$record->trxnumber}}</h1>
<h1>PO : ID {{$record->id}}</h1>
<footer>
	Print at {{ date('d F Y') }}
</footer>
