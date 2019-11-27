/**
 * 
 * @param {org.hlfc.qlts.TaoGiaiDoanCheBien} chebien
 * @transaction
 */

async function TaoGiaiDoanCheBien(chebien) { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const namespace = 'org.hlfc.qlts';

    const cb = factory.newResource(namespace, 'GiaiDoanCheBien', chebien.idgdcb);

    const SanPhamNoiRegistry = await getAssetRegistry(chebien.sanphamnoi.getFullyQualifiedType());
    let ex = await SanPhamNoiRegistry.exists(chebien.sanphamnoi.getIdentifier());  
    let s = await SanPhamNoiRegistry.get(chebien.sanphamnoi.getIdentifier());
  
    if ((chebien.sanphamnoi.getIdentifier() == chebien.sanphamngoai.getIdentifier()) && ex == true) {
        cb.sanphamnoi = factory.newRelationship(namespace, 'SanPhamNoi', chebien.sanphamnoi.getIdentifier());
        cb.sanphamngoai = factory.newRelationship(namespace, 'SanPhamNgoai', chebien.sanphamngoai.getIdentifier());
    } else {
        throw new Error("Id san pham noi khong khop san pham ngoai hoac khong ton tai!")
    }

    
  	if(s.nguyenlieu.$identifier == chebien.nguyenlieu.$identifier){
    	cb.nguyenlieu = factory.newRelationship(namespace,'NguyenLieu',chebien.nguyenlieu.getIdentifier());
    }
  	else {
    	throw new Error ('Nguyen lieu khong khop vui long kiem tra lai!');
 	}
  
    const csRegistry = await getAssetRegistry(chebien.cscb.getFullyQualifiedType());
    let csex = await csRegistry.exists(chebien.cscb.getIdentifier());
    if (csex == true) {
        cb.cscb = factory.newRelationship(namespace, 'CoSoCB', chebien.cscb.getIdentifier());
    } else {
        throw new Error("id CS che bien khong ton tai vui long kiem tra lai");
    };
    
    //Thong tin nhan nguyen lieu
    cb.soluongnhan = chebien.soluongnhan;
    cb.tgnhannl = chebien.tgnhannl;
    cb.masolonhan = chebien.masolonhan;
    cb.tennguoinhan = chebien.tennguoinhan;

    //cat tiet fillet
    cb.khoiluongcattiet = chebien.khoiluongcattiet;
    cb.khoiluongrua = chebien.khoiluongrua;
    cb.tgrua = chebien.tgrua;
    cb.tennguoirua = chebien.tennguoirua;
    cb.nongdo = chebien.nongdo;
    cb.nhietdo = chebien.nhietdo;

    //lang da, soi ky sinh trung
    cb.khoiluongsoche = chebien.khoiluongsoche;
    cb.tgbdsoche = chebien.tgbdsoche;
    cb.tgktsoche = chebien.tgktsoche;
    cb.tennguoisoche = chebien.tennguoisoche;

    //cap dong
    cb.nhietdocd = chebien.nhietdocd;
    cb.tgcapdong = chebien.tgcapdong;
    cb.tennguoicd = chebien.tennguoicd;

    //bao goi
    cb.tennccbb = chebien.tennccbb;
    cb.soluongbb = chebien.soluongbb;
    cb.loaibb = chebien.loaibb;
    cb.tennguoibg = chebien.tennguoibg;
    cb.masanpham = chebien.masanpham;

    //bao quan
    cb.nhietdobq = chebien.nhietdobq;
    cb.tgxuat = chebien.tgxuat;
  	cb.soluonggiao = chebien.soluonggiao;
  	cb.masologiao = chebien.masologiao;
    cb.diadiemgiao = chebien.diadiemgiao;
      
    const ptRegistry = await getAssetRegistry(chebien.phuongtien.getFullyQualifiedType());
    let ptex = await ptRegistry.exists(chebien.phuongtien.getIdentifier());
    if (ptex == true) {
        cb.phuongtien = factory.newRelationship(namespace, 'PhuongTien', chebien.phuongtien.getIdentifier());
    } else {
        throw new Error("id Phuong tien khong ton tai vui long kiem tra lai");
    }

    if ((chebien.cspp.getFullyQualifiedType()) == (namespace + '.CoSoPP')) {
        const ttnRegistry = await getAssetRegistry(chebien.cspp.getFullyQualifiedType());
        let ttnex = await ttnRegistry.exists(chebien.cspp.getIdentifier());
        if (ttnex == true) {
            cb.cspp = factory.newRelationship(namespace, 'CoSoPP', chebien.cspp.getIdentifier());
        } else {
            throw new Error("id CS phan phoi nhan khong ton tai vui long kiem tra lai");
        };
    } else {
        throw new Error("Co so nhan phai la Co so phan phoi!");
    }

    cb.tennguoivc = chebien.tennguoivc;
   
    if (s.ncb.$identifier == chebien.nhachebien.getIdentifier()) {
        cb.owner = factory.newRelationship(namespace, 'NhaCheBien', chebien.nhachebien.getIdentifier());
    } else {
        throw new Error("Owner khong khop voi nguoi tham gia san pham vui long kiem tra lai!");
    }


    //save the application
    const assetRegistry = await getAssetRegistry(cb.getFullyQualifiedType());
    
    const spn = chebien.sanphamnoi;
    const SanPhamNgoaiRegistry = await getAssetRegistry(chebien.sanphamngoai.getFullyQualifiedType());
    const spng = chebien.sanphamngoai;

    if (spn.status === 'giaidoan_chebien'){
        spn.status = 'giaidoan_phanphoi';
        spng.status = 'giaidoan_phanphoi';
        spn.dathem.push(factory.newRelationship(namespace, 'NhaCheBien', chebien.nhachebien.getIdentifier()));
        //them id giai doan vao truy xuat noi
        spn.truyxuatnoi.push(chebien.idgdcb);
        await SanPhamNoiRegistry.update(spn);

        //them co so vao truy xuat ngoai
        spng.truyxuatngoai.push(chebien.cscb.getIdentifier());
        await SanPhamNgoaiRegistry.update(spng);


        await assetRegistry.add(cb);
        // emit event
        const CheBienEvent = factory.newEvent(namespace, 'TaoGiaiDoanCheBienEvent');
        CheBienEvent.sanpham = spng;
        emit(CheBienEvent);
    }
    else if (spn.status === 'hoantat'){
        throw new Error ('San pham da hoan tat cac giai doan vui long kiem tra lai!');
    }
    else {
        throw new Error ('Giai doan che bien chua duoc nhap');
    }
}