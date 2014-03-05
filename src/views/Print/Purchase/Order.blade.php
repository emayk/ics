<!--Preview-->
<!--Section Preview -->
<!--<style>-->
<!--	@media print {-->
<!--		div.preview {-->
<!--			display: block;-->
<!--		}-->
<!--		div.testprint {-->
<!--			display: none;-->
<!--		}-->
<!---->
<!--		table.mytable {-->
<!--			display: none;-->
<!--		}-->
<!---->
<!--	}-->
<!---->
<!--	@media screen {-->
<!---->
<!--		div.testprint {-->
<!--			display: block;-->
<!--		}-->
<!--	  table.mytable {-->
<!--		  display: block;-->
<!--	  }-->
<!---->
<!--	  div.preview {-->
<!--		  display: none;-->
<!--	  }-->
<!--	}-->
<!---->
<!--</style>-->

{{--Halaman Original--}}
{{--record == order --}}
<?php
//$limitperpage = 3;
//$totalrecord = 30;
?>
<div class="testprint">
<div align="left">
<table class="mytable" width="100%" border="0" cellpadding="1" cellspacing="1" bgcolor="#CCCCCC">
<tr bgcolor="#FFFFFF">
<td>
<table width="100%" border="0" cellpadding="1" cellspacing="1">
<thead>
<tr bgcolor="#FFFFFF">
	<td>
		<table width="100%" border="0" cellpadding=" 0" cellspacing="0">
			<tr>
				<td colspan="1" valign="top" nowrap>
					<span style="font-size:18pt;font-weight:bold;text-decoration:underline;">PURCHASE ORDER</span>
				</td>
				<td nowrap>
					<span style="font-size:10pt;">{{ ($record->cntprint == 0) ? "Original" : "Duplikasi ".($record->cntprint -1) }} </span>
				</td>

			</tr>
			<tr valign="top">
				<td valign="middle" align="left" nowrap>
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td colspan="7">&nbsp;</td>
						</tr>
						{{--Supplier--}}
						<tr>
							<td width="20%" align="left">Nama Pemasok</td>
							<td width="2%">:</td>
							<td width="10%" align="left" nowrap>{{ $record->supplier->name }}</td>
							<td nowrap>&nbsp;</td>
							<td width="15%" nowrap align="left">No PO</td>
							<td width="2%" nowrap>:&nbsp;</td>
							<td width="10%" nowrap align="left"><span style="font-size:12pt;font-weight:bold;">{{ $record->trxnumber }} </span>
							</td>
						</tr>
						{{--Contact--}}
						<tr>
							<td width="20%" align="left">Nama Sales</td>
							<td width="2%">:</td>
							<td width="10%" align="left" nowrap>{{ $record->contact->name }}</td>
							<td nowrap>&nbsp;</td>
							<td width="15%" nowrap align="left">Jangka waktu</td>
							<td width="2%" nowrap>:&nbsp;</td>
							<?php
							$tglterm = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $record->created_at)
								->addDays($record->credit)->format('d F Y');
							?>
							<td width="10%" nowrap align="left"><span style="font-size:12pt;">
															{{ $record->credit }} Hari / {{ $tglterm }} </span>
							</td>
						</tr>

						{{--Gudang--}}
						<tr>
							<td width="20%" align="left">Dikirim Ke</td>
							<td width="2%">:</td>
							<td width="10%" align="left" nowrap>{{ $record->warehouse->name }}</td>
							<td nowrap>&nbsp;</td>
							<td width="15%" nowrap align="left">Dikirim Pada</td>
							<td width="2%" nowrap>:&nbsp;</td>
							<?php
							$date = \Carbon\Carbon::createFromFormat('Y-m-d', $record->delivery_at);
							$delivery_at = $date->format('d F Y');
							?>
							<td width="10%" nowrap align="left"><span style="font-size:12pt;">{{ $delivery_at }} </span>
							</td>
						</tr>

					</table>
				</td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td colspan="3">&nbsp;</td>
			</tr>
</thead>
<tbody>
<tr>
	<td colspan="3" valign="top" nowrap>
		<table id="ItemBPB" width="100%" border="1" cellspacing="0" cellpadding="2"
			>

			<thead>
			<tr align="center" valign="top">
				<td width="2%" align="center" nowrap><strong>No</strong></td>
				<td width="23%" align="center" nowrap><strong>Nama Produk</strong><br/></td>
				<td width="10%" align="center" nowrap><strong>Kuantitas</strong></td>
				<td width="10%" align="center" nowrap><strong>Harga</strong></td>
				<td width="10%" align="center" nowrap><strong>Sub Total</strong></td>
				<td width="10%" align="center" nowrap><strong>Down Payment</strong></td>
				<td width="10%" align="center" nowrap><strong>Sisa Bayar</strong></td>
			</tr>
			</thead>
			<tbody>
			<!-- Daftar Item PO -->
			<?php $cnt = 1;
			$totalsisa = 0;
			$totalsubtotal = 0;
			?>
			@foreach ($record->item as $item)
			<?php
			$totalsubtotal = $totalsubtotal + $item->subtotal;
			$sisa = ( $item->subtotal - $item->dp );
			$totalsisa = $totalsisa + $sisa;
			?>
			<tr>
				<td> {{ $cnt }}</td>
				<td> {{ $item->product->name }}</td>
				<td> {{ $item->formatNumberIndonesia($item->qty) }}</td>
				<td> {{ $item->formatNumberIndonesia($item->price) }}</td>
				<td> {{ $item->formatNumberIndonesia($item->subtotal) }}</td>
				<td> {{ $item->formatNumberIndonesia($item->dp) }}</td>
				<td> {{ $item->formatNumberIndonesia( $sisa ) }}</td>
			</tr>
			<?php $cnt++; ?>
			@endforeach
			</tbody>

			<tfooter>
				<tr>
					<td colspan="4">
						Total
					</td>

					<td>
						{{ $record->formatNumberIndonesia($totalsubtotal)}}
					</td>


					<td>
						{{ $record->formatNumberIndonesia($record->totaldp)}}
					</td>

					<td>
						{{ $record->formatNumberIndonesia($totalsisa) }}
					</td>
				</tr>
			</tfooter>
		</table>
	</td>
</tr>
</tbody>


<tfooter>
	<tr>
		<td nowrap>
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td valign="baseline">&nbsp;</td>
					<td valign="baseline">&nbsp;</td>
					<td valign="baseline">&nbsp;</td>
					<td valign="baseline">&nbsp;</td>
					<td valign="baseline">&nbsp;</td>
					<td valign="baseline">&nbsp;</td>
					<td valign="baseline">&nbsp;</td>
				</tr>

				<tr>
					<td valign="baseline">&nbsp;</td>
					<td colspan="5">
						Catatan :
						<ul>
							<li>Document ini dicetak oleh {{ $record->getUserFullname() }}</li>
							<li>dan dibuat pada {{ date('d F Y')}}</li>
						</ul>
					</td>

					<td colspan="2">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td align="center">Dicetak Oleh</td>
							</tr>
							<tr>
								<td align="center">&nbsp;</td>
							</tr>
							<tr>
								<td align="center">&nbsp;</td>
							</tr>
							<tr>
								<td align="center"><br/>&nbsp;</td>
							</tr>
							<tr>
								<!--																																					<td align="center">(<u>&nbsp;{{ "Username" }}&nbsp;</u>)</td>-->

								<td align="center">(<u>&nbsp;{{ $record->getUserFullname() }}&nbsp;</u>)</td>
							</tr>
							<tr>
								<td>&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</tfooter>

</table>
</td>

</tr>
</table>
</div>
</div>

