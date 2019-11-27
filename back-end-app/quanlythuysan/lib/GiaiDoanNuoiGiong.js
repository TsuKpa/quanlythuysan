/**
 * 
 * @param {org.hlfc.qlts.TaoGiaiDoanNuoiGiong} nuoigiong
 * @transaction
 */

async function TaoGiaiDoanNuoiGiong(nuoigiong) { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const namespace = 'org.hlfc.qlts';

    const ng = factory.newResource(namespace, 'GiaiDoanNuoiGiong', nuoigiong.idgdng);
    const SanPhamNoiRegistry = await getAssetRegistry(nuoigiong.sanphamnoi.getFullyQualifiedType());
    let ex = await SanPhamNoiRegistry.exists(nuoigiong.sanphamnoi.getIdentifier());
    let s = await SanPhamNoiRegistry.get(nuoigiong.sanphamnoi.getIdentifier());

    if ((nuoigiong.sanphamnoi.getIdentifier() == nuoigiong.sanphamngoai.getIdentifier()) && ex == true) {
        ng.sanphamnoi = factory.newRelationship(namespace, 'SanPhamNoi', nuoigiong.sanphamnoi.getIdentifier());
        ng.sanphamngoai = factory.newRelationship(namespace, 'SanPhamNgoai', nuoigiong.sanphamngoai.getIdentifier());
    } else {
        throw new Error("Id san pham noi khong khop san pham ngoai hoac khong ton tai!");
    }

    if (s.nguyenlieu.$identifier == nuoigiong.nguyenlieu.$identifier) {
        ng.nguyenlieu = factory.newRelationship(namespace, 'NguyenLieu', nuoigiong.nguyenlieu.getIdentifier());
    } else {
        throw new Error('Nguyen lieu khong khop vui long kiem tra lai!');
    }

    const aoRegistry = await getAssetRegistry(nuoigiong.ao.getFullyQualifiedType());
    let aoex = await aoRegistry.exists(nuoigiong.ao.getIdentifier());
    if (aoex == true) {
        ng.ao = factory.newRelationship(namespace, 'AoNG', nuoigiong.ao.getIdentifier());
    } else {
        throw new Error("id Ao khong ton tai vui long kiem tra lai");
    }

    const ttRegistry = await getAssetRegistry(nuoigiong.trangtrai.getFullyQualifiedType());
    let ttex = await ttRegistry.exists(nuoigiong.trangtrai.getIdentifier());
    if (ttex == true) {
        ng.trangtrai = factory.newRelationship(namespace, 'TrangTraiNG', nuoigiong.trangtrai.getIdentifier());
    } else {
        throw new Error("id Trang trai khong ton tai vui long kiem tra lai");
    }

    ng.tgnuoi = nuoigiong.tgnuoi;
    ng.tgxuatao = nuoigiong.tgxuatao;


    const ptRegistry = await getAssetRegistry(nuoigiong.phuongtien.getFullyQualifiedType());
    let ptex = await ptRegistry.exists(nuoigiong.phuongtien.getIdentifier());
    if (ptex == true) {
        ng.phuongtien = factory.newRelationship(namespace, 'PhuongTien', nuoigiong.phuongtien.getIdentifier());
    } else {
        throw new Error("id Phuong tien khong ton tai vui long kiem tra lai");
    }


    if ((nuoigiong.trangtrainhan.getFullyQualifiedType()) == (namespace + '.TrangTraiNNL')) {
        const ttnRegistry = await getAssetRegistry(nuoigiong.trangtrainhan.getFullyQualifiedType());
        let ttnex = await ttnRegistry.exists(nuoigiong.trangtrainhan.getIdentifier());
        if (ttnex == true) {
            ng.trangtrainhan = factory.newRelationship(namespace, 'TrangTraiNNL', nuoigiong.trangtrainhan.getIdentifier());
        } else {
            throw new Error("id Trang trai nhan khong ton tai vui long kiem tra lai");
        };
    } else {
        throw new Error("Trang trai nhan phai la trang trai nuoi nguyen lieu!");
    }




    ng.soluong = nuoigiong.soluong;
    ng.mota = nuoigiong.mota;


    if (s.ttng.$identifier == nuoigiong.trangtrainuoigiong.getIdentifier()) {
        ng.owner = factory.newRelationship(namespace, 'TrangTraiNuoiGiong', nuoigiong.trangtrainuoigiong.getIdentifier());
    } else {
        throw new Error("Owner khong khop voi nguoi tham gia san pham vui long kiem tra lai!");
    }

    //save the application
    const assetRegistry = await getAssetRegistry(ng.getFullyQualifiedType());


    //add id to truyxuatnoi

    const SanPhamNgoaiRegistry = await getAssetRegistry(nuoigiong.sanphamngoai.getFullyQualifiedType());
    const spng = nuoigiong.sanphamngoai;
    const spn = nuoigiong.sanphamnoi;
    if (spn.status === 'giaidoan_nuoigiong') {
        spn.status = 'giaidoan_nuoinguyenlieu';
        spng.status = 'giaidoan_nuoinguyenlieu';

        spn.dathem = [factory.newRelationship(namespace, 'TrangTraiNuoiGiong', nuoigiong.trangtrainuoigiong.getIdentifier())];
        //them id giai doan vao truy xuat noi
        spn.truyxuatnoi.push(nuoigiong.idgdng);
        await SanPhamNoiRegistry.update(spn);

        //them trang trai vao truy xuat ngoai
        spng.truyxuatngoai.push(nuoigiong.trangtrai.getIdentifier());
        await SanPhamNgoaiRegistry.update(spng);


        await assetRegistry.add(ng);
        // emit event
        const nuoiGiongEvent = factory.newEvent(namespace, 'TaoGiaiDoanNuoiGiongEvent');
        nuoiGiongEvent.sanpham = spng;
        emit(nuoiGiongEvent);
    } else if (spn.status === 'hoantat') {
        throw new Error('San pham da hoan tat cac giai doan vui long kiem tra lai!');
    } else {
        throw new Error('Giai doan nuoi giong chua duoc nhap');
    }
}