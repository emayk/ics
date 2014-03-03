<h1>Daftar Bukti Terima Barang</h1>
<table border="1">
	<thead>
	<!--	Pemasok-->
	<tr>
		<td colspan="5">
			<td>1</td>
			<td>2</td>
			Nama Pemasok
		</td>
		<td>{{ $record->order->supplier->name}}</td>
		<td>Nama Sales</td>
		<td>{{ $record->order->contact->name }}</td>
	</tr>
	<!--Surat Jalan-->
	<tr>
		<td>Nomor Surat Jalan</td>
		<td>{{ is_null($record->sjno) ? $record->sjno : 'Belum Diset' }}</td>
		<td>Tanggal</td>
		<td> {{ $record->sjtgl or date('d F Y') }}</td>
	</tr>
	<!--No Bukti-->
	<tr>
		<td>No Bukti</td>
		<td>{{ $record->trxnumber}}</td>
		<td></td>
		<td></td>
	</tr>
	<!--	Purchase-->
	<tr>
		<td>NO Purchase</td>
		<td>{{ $record->order->trxnumber }}</td>
		<td></td>
		<td></td>
	</tr>
	<!--BPB-->
	<tr>
		<td>Tanggal Terima</td>
		<td>{{ $record->created_at or date('d F Y') }}</td>
		<td>Total Item</td>
		<td>{{$record->item->count() }}</td>
	</tr>
<!--	</thead>-->

<!--	<thead>-->
	<tr>
		<td>ID</td>
		<td>Product</td>
	<td>Jml <br/>Terima <br/>Roll</td>
	<td>Qty</td>
	<td>Status</td>
	</tr>
	</thead>
	<?php $no = 1; ?>
	<tbody>
	@foreach ($record->item as $item)
	<tr>
		<td>{{ $no }}</td>
		<td>{{ $item->product->name }}</td>
		<td>{{ $item->id }} </td>
		<td>{{ $item->qtyreceived }}</td>
		<td>{{ $item->getStatus->name }}</td>
		<?php $no++; ?>
	</tr>
	@endforeach
	</tbody>
</table>

<footer>
	Generate {{ date('d F Y h:i:s') }}
</footer>

<hr>
@{{ s($record->toArray() ) }}
<br/>
@{{ s($record->item->toArray() ) }}
<br/>

</html>