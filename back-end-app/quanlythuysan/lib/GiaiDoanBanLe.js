/**
 * 
 * @param {org.hlfc.qlts.TaoGiaiDoanBanLe} banle
 * @transaction
 */

async function TaoGiaiDoanBanLe(banle) { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const namespace = 'org.hlfc.qlts';

    const bl = factory.newResource(namespace, 'GiaiDoanBanLe', banle.idgdbl);

    const SanPhamNoiRegistry = await getAssetRegistry(banle.sanphamnoi.getFullyQualifiedType());
    let s = await SanPhamNoiRegistry.get(banle.sanphamnoi.getIdentifier());
    let ex = await SanPhamNoiRegistry.exists(banle.sanphamnoi.getIdentifier());


    if ((banle.sanphamnoi.getIdentifier() == banle.sanphamngoai.getIdentifier()) && ex == true) {
        bl.sanphamnoi = factory.newRelationship(namespace, 'SanPhamNoi', banle.sanphamnoi.getIdentifier());
        bl.sanphamngoai = factory.newRelationship(namespace, 'SanPhamNgoai', banle.sanphamngoai.getIdentifier());
    } else {
        throw new Error("Id san pham noi khong khop san pham ngoai hoac khong ton tai!")
    }



    if (s.nguyenlieu.$identifier == banle.nguyenlieu.$identifier) {
        bl.nguyenlieu = factory.newRelationship(namespace, 'NguyenLieu', banle.nguyenlieu.getIdentifier());
    } else {
        throw new Error('Nguyen lieu khong khop vui long kiem tra lai!');
    }

    const csRegistry = await getAssetRegistry(banle.csbl.getFullyQualifiedType());
    let csex = await csRegistry.exists(banle.csbl.getIdentifier());
    if (csex == true) {
        bl.csbl = factory.newRelationship(namespace, 'CoSoBL', banle.csbl.getIdentifier());
    } else {
        throw new Error("id CS ban le khong ton tai vui long kiem tra lai");
    };

    //Thong tin nhan san pham
    bl.soluongnhan = banle.soluongnhan;
    bl.tgnhan = banle.tgnhan;

    bl.masolonhan = banle.masolonhan;
    bl.tennguoigiao = banle.tennguoigiao;
    bl.phanloai = banle.phanloai;
    bl.masanpham = banle.masanpham;

    if (s.nbl.$identifier == banle.nhabanle.getIdentifier()) {
        bl.owner = factory.newRelationship(namespace, 'NhaBanLe', banle.nhabanle.getIdentifier());
    } else {
        throw new Error("Owner khong khop voi nguoi tham gia san pham vui long kiem tra lai!");
    }


    const assetRegistry = await getAssetRegistry(bl.getFullyQualifiedType());

    const spn = banle.sanphamnoi;
    const SanPhamNgoaiRegistry = await getAssetRegistry(banle.sanphamngoai.getFullyQualifiedType());
    const spng = banle.sanphamngoai;

    if (spn.status === 'giaidoan_banle') {
        spn.status = 'hoantat';
        spng.status = 'hoantat';
        spn.dathem.push(factory.newRelationship(namespace, 'NhaBanLe', banle.nhabanle.getIdentifier()));

        //them id giai doan vao truy xuat noi
        spn.truyxuatnoi.push(banle.idgdbl);
        await SanPhamNoiRegistry.update(spn);


        //them co so vao truy xuat ngoai
        spng.truyxuatngoai.push(banle.csbl.getIdentifier());
        await SanPhamNgoaiRegistry.update(spng);

        await assetRegistry.add(bl);

        // emit event
        const banleEvent = factory.newEvent(namespace, 'TaoGiaiDoanBanLeEvent');
        banleEvent.sanpham = spng;
        emit(banleEvent);
    } else if (spn.status === 'hoantat') {
        throw new Error('San pham da hoan tat cac giai doan vui long kiem tra lai!');
    } else {
        throw new Error('Giai doan ban le chua duoc nhap');
    }
}