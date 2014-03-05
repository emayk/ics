{{-- s($itemhistory->toArray()) --}}

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
											<span
												style="font-size:18pt;font-weight:bold;text-decoration:underline;">BUKTI TERIMA BARANG</span>
										</td>
										<td nowrap>
											<span style="font-size:10pt;">{{ ($record->cntprint == 0) ? "Original" : "Duplikasi ".($record->cntprint) }} </span>
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
													<td width="10%" align="left" nowrap>{{ $order->supplier->name }}</td>
													<td nowrap>&nbsp;</td>
													<td width="15%" nowrap align="left">No PO</td>
													<td width="2%" nowrap>:&nbsp;</td>
													<td width="10%" nowrap align="left"><span style="font-size:12pt;font-weight:bold;">{{ $order->trxnumber }} </span>
													</td>
												</tr>

												<tr>
													<td width="20%" align="left">Nama Sales</td>
													<td width="2%">:</td>
													<td width="10%" align="left" nowrap>{{ $order->contact->name }}</td>
													<td nowrap>&nbsp;</td>
													<td width="15%" nowrap align="left">Terima Tanggal</td>
													<td width="2%" nowrap>:&nbsp;</td>
													<?php
													$date = \Carbon\Carbon::createFromFormat('Y-m-d', $record->receivedate);
													$delivery_at = $date->format('d F Y');
													?>
													<td width="10%" nowrap align="left"><span style="font-size:12pt;">{{ $delivery_at }} </span>
													</td>
												</tr>
												<!--Surat Jalan -->
												<tr>
													<td width="20%" align="left">Surat Jalan</td>
													<td width="2%">:</td>
													<td width="10%" align="left" nowrap>{{ $record->suratjalan->nomor }}</td>
													<td nowrap>&nbsp;</td>
													<td width="15%" nowrap align="left">Tgl Surat Jalan</td>
													<td width="2%" nowrap>:&nbsp;</td>
													<?php
													$sjdate = \Carbon\Carbon::createFromFormat('Y-m-d', $record->suratjalan->tgl)->format('d F Y');
													?>
													<td width="10%" nowrap align="left"><span style="font-size:12pt;font-weight:bold;">{{ $sjdate }} </span>
													</td>
												</tr>
<!--Detail Suratjalan-->
												<tr>
													<td width="20%" align="left">Nama Supir </td>
													<td width="2%">:</td>
													<td width="10%" align="left" nowrap>{{ $record->suratjalan->drivername }}</td>
													<td nowrap>&nbsp;</td>
													<td width="15%" nowrap align="left">Nomor Kendaraan</td>
													<td width="2%" nowrap>:&nbsp;</td>
													<td width="10%" nowrap align="left"><span style="font-size:12pt;font-weight:bold;">{{ $record->suratjalan->platnomor }} </span>
													</td>
												</tr>
<!--												Kiriman Ke ? -->
												<tr>
													<td width="20%" align="left">Kiriman ke</td>
													<td width="2%">:</td>
													<td width="10%" align="left" nowrap>{{ $record->getKirimanke() }}</td>
													<td nowrap>&nbsp;</td>
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
									<tr align="center" valign="center">
										<td rowspan="2" width="2%" align="center" nowrap><strong>No</strong></td>
										<td rowspan="2" width="23%" align="center" nowrap><strong>Nama Produk</strong><br/></td>
										<td colspan="2" width="10%" align="center" nowrap><strong>Qty Terima</strong></td>
										<td colspan="2" width="10%" align="center" nowrap><strong>Total Sudah Terima</strong></td>
									</tr>
									<tr align="center" valign="top">
										<td width="10%" align="center" nowrap><strong>Qty</strong></td>
										<td width="10%" align="center" nowrap><strong>Roll</strong></td>
										<td width="10%" align="center" nowrap><strong>Qty</strong></td>
										<td width="10%" align="center" nowrap><strong>Roll</strong></td>

									</tr>
									</thead>
									<tbody>
									<!--Isi Record-->
									<tr>
										<td>1</td>
										<td>{{ $record->item->product->name}}</td>
										<td>{{ $record->qty}} yard</td>
										<td>{{ $record->qtyroll}} roll</td>
										<td>{{ $record->qtyreceived}} yard</td>
										<td>{{ $record->qtyrollreceived}} roll</td>

									</tr>

									</tbody>

									<tfooter>

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