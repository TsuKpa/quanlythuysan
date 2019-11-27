/**
 * 
 * @param {org.hlfc.qlts.TaoSanPham} sanpham
 * @transaction
 */

async function TaoSanPham(sanpham) { // eslint-disable-line no-unused-vars
  const factory = getFactory();
  const namespace = 'org.hlfc.qlts';

  const sp = factory.newResource(namespace, 'SanPhamNoi', sanpham.idSP);
  const spn = factory.newResource(namespace, 'SanPhamNgoai', sanpham.idSP);
  spn.truyxuatngoai = [];
  sp.truyxuatnoi = [];

  //kiem tra id co ton tai
  const nlRegistry = await getAssetRegistry(namespace + '.NguyenLieu');
  var nlex = await nlRegistry.exists(sanpham.nguyenlieu.getIdentifier());
  if (nlex == true) {
    sp.nguyenlieu = factory.newRelationship(namespace, 'NguyenLieu', sanpham.nguyenlieu.getIdentifier());
  }
  else {
    throw new Error("Id nguyen lieu khong ton tai!");
  }


  const ngRegistry = await getParticipantRegistry(namespace + '.TrangTraiNuoiGiong');
  var ngex = await ngRegistry.exists(sanpham.ttng.getIdentifier());
  if (ngex == true) {
    sp.ttng = factory.newRelationship(namespace, 'TrangTraiNuoiGiong', sanpham.ttng.getIdentifier());
  }
  else {
    throw new Error("Id trang trai nuoi giong khong ton tai!");
  }


  const nnlRegistry = await getParticipantRegistry(namespace + '.TrangTraiNuoiNguyenLieu');
  var nnlex = await nnlRegistry.exists(sanpham.ttnnl.getIdentifier());
  if (nnlex == true) {
    sp.ttnnl = factory.newRelationship(namespace, 'TrangTraiNuoiNguyenLieu', sanpham.ttnnl.getIdentifier());
  }
  else {
    throw new Error("Id trang trai nguyen lieu khong ton tai!");
  }


  const cbRegistry = await getParticipantRegistry(namespace + '.NhaCheBien');
  var cbex = await cbRegistry.exists(sanpham.ncb.getIdentifier());
  if (cbex == true) {
    sp.ncb = factory.newRelationship(namespace, 'NhaCheBien', sanpham.ncb.getIdentifier());
  }
  else {
    throw new Error("Id nha che bien khong ton tai!");
  }


  const ppRegistry = await getParticipantRegistry(namespace + '.NhaPhanPhoi');
  var ppex = await ppRegistry.exists(sanpham.npp.getIdentifier());
  if (ppex == true) {
    sp.npp = factory.newRelationship(namespace, 'NhaPhanPhoi', sanpham.npp.getIdentifier());
  }
  else {
    throw new Error("Id nha phan phoi khong ton tai!");
  }


  const blRegistry = await getParticipantRegistry(namespace + '.NhaBanLe');
  var blex = await blRegistry.exists(sanpham.nbl.getIdentifier());
  if (blex == true) {
    sp.nbl = factory.newRelationship(namespace, 'NhaBanLe', sanpham.nbl.getIdentifier());
  }
  else {
    throw new Error("Id nha ban le khong ton tai!");
  }

  if (sanpham.mota != "" && sanpham.title != "" && sanpham.hinhanh != "") {
    spn.mota = sanpham.mota;
    spn.title = sanpham.title;
    spn.hinhanh = sanpham.hinhanh;
  }
  else {
    throw new Error("Can dien day du thong tin!");
  }
  //save the application
  const assetRegistry = await getAssetRegistry(sp.getFullyQualifiedType());
  await assetRegistry.add(sp);

  const assetRegistryn = await getAssetRegistry(spn.getFullyQualifiedType());
  await assetRegistryn.add(spn);


  // emit event
  const applicationEvent = factory.newEvent(namespace, 'TaoSanPhamEvent');
  applicationEvent.sanpham = spn;
  emit(applicationEvent);
}