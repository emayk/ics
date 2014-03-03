<!--<style>-->
<!---->
<!--	@media screen {-->
<!--		p.bodyText {-->
<!--			font-family: verdana, arial, sans-serif;-->
<!--		}-->
<!--	}-->
<!---->
<!--	@media print {-->
<!--		p.bodyText {-->
<!--			font-family: georgia, times, serif;-->
<!--		}-->
<!--	}-->
<!---->
<!--	@media screen, print {-->
<!--		p.bodyText {-->
<!--			font-size: 10pt-->
<!--		}-->
<!--	}-->
<!---->
<!--</style>-->

{{--Halaman Bukti Terima Barang Per Satuan--}}
{{--record == receive --}}

<div class="noprint">
	<div align="left">
		<table width="100%" border="0" cellpadding="1" cellspacing="1" bgcolor="#CCCCCC">
			<tr bgcolor="#FFFFFF">
				<td>
					<table width="100%" border="0" cellpadding="1" cellspacing="1">
						<thead>
						<tr bgcolor="#FFFFFF">
							<td>
								<table width="100%" border="0" cellpadding=" 0" cellspacing="0">
									<tr>
										<td colspan="1" valign="top" nowrap>
											<span
												style="font-size:18pt;font-weight:bold;text-decoration:underline;">BUKTI TERIMA BARANG</span>
										</td>
										<td nowrap>
											<!--									<span style="font-size:10pt;"> "Original" </span>-->
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
													<td width="10%" align="left" nowrap>{{ $record->order->supplier->name }}</td>
													<td nowrap>&nbsp;</td>
													<td width="15%" nowrap align="left">No BPB</td>
													<td width="2%" nowrap>:&nbsp;</td>
													<td width="10%" nowrap align="left"><span style="font-size:12pt;font-weight:bold;">{{ $record->trxnumber }} </span>
													</td>
												</tr>
												{{--Gudang dan Qty Terima --}}
												<tr>
													<td width="20%" align="left">Diterima di</td>
													<td width="2%">:</td>
													<td width="10%" align="left" nowrap>{{ $record->order->warehouse->name }}</td>
													<td nowrap>&nbsp;</td>
													<td width="15%" nowrap align="left"></td>
													<td width="2%" nowrap>&nbsp;</td>
													<td width="10%" nowrap align="left"><span style="font-size:12pt;"></span>
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
								<table id="ItemPO" width="100%" border="1" cellspacing="0" cellpadding="2" >
									<thead>

									<tr align="center" valign="top">

										<td width="2%" align="center" nowrap><strong>No</strong></td>
										<td width="23%" align="center" nowrap><strong>Nama Produk</strong></td>
										<td width="10%" align="center" nowrap><strong>Qty Yard</strong></td>
										<td width="10%" align="center" nowrap><strong>Qty Roll</strong></td>
										<td width="10%" align="center" nowrap><strong>Terima Tgl</strong></td>
										<td width="10%" align="center" nowrap><strong>Surat Jalan</strong></td>
										<td width="10%" align="center" nowrap><strong>Diterima Oleh</strong></td>
										<!--										<td width="15%" align="center" nowrap><strong>Keterangan</strong></td>-->
									</tr>
									</thead>
									<tbody>
									<!-- Daftar Item PO -->
									<?php $cnt = 1; ?>
									@foreach ($record->item as $item)
										<? $cntrow = $item->history->count(); ?>
									@foreach ($item->history as $h)
									<tr rowspan="{{$cntrow}}">
										<td>{{$cnt}}</td>
										<td>{{$h->product->name}}</td>
										<td>{{$h->qty}}</td>
										<td>{{$h->qtyroll}}</td>
										<?php $terimatgl = \Carbon\Carbon::createFromFormat('Y-m-d', $h->receivedate)
											->format('d F Y'); ?>
										<td>{{$terimatgl}}</td>
										<td>{{$h->suratjalan->nomor}}</td>
										<td>{{$h->receiveby->username}}</td>
										<?php $cnt++; ?>
									</tr>
									@endforeach
									@endforeach
									</tbody>

									<tfooter>
										<tr>
											<td colspan="2">
												Total
											</td>

											<td>
												<!--qty-->
												{{ $record->formatNumberIndonesia($record->totalreceiveditem) }} Yard

											</td>

											<td>
												<!--qty roll-->
												{{ $record->formatNumberIndonesia($record->totalrollreceived) }} Roll
											</td>
											<td colspan="3"></td>
<!--											<td></td>-->
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
		<!--	/noprint-->
	</div>
