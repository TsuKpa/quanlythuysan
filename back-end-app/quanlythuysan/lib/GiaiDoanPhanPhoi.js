/**
 * 
 * @param {org.hlfc.qlts.TaoGiaiDoanPhanPhoi} phanphoi
 * @transaction
 */

async function TaoGiaiDoanPhanPhoi(phanphoi) { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const namespace = 'org.hlfc.qlts';

    const pp = factory.newResource(namespace, 'GiaiDoanPhanPhoi', phanphoi.idgdpp);

    const SanPhamNoiRegistry = await getAssetRegistry(phanphoi.sanphamnoi.getFullyQualifiedType());
  	let s = await SanPhamNoiRegistry.get(phanphoi.sanphamnoi.getIdentifier());
    let ex = await SanPhamNoiRegistry.exists(phanphoi.sanphamnoi.getIdentifier());  


    if ((phanphoi.sanphamnoi.getIdentifier() == phanphoi.sanphamngoai.getIdentifier()) && ex == true) {
        pp.sanphamnoi = factory.newRelationship(namespace, 'SanPhamNoi', phanphoi.sanphamnoi.getIdentifier());
        pp.sanphamngoai = factory.newRelationship(namespace, 'SanPhamNgoai', phanphoi.sanphamngoai.getIdentifier());
    } else {
        throw new Error("Id san pham noi khong khop san pham ngoai hoac khong ton tai!")
    }


    
  	if(s.nguyenlieu.$identifier == phanphoi.nguyenlieu.$identifier){
    	pp.nguyenlieu = factory.newRelationship(namespace,'NguyenLieu',phanphoi.nguyenlieu.getIdentifier());
    }
  	else {
    	throw new Error ('Nguyen lieu khong khop vui long kiem tra lai!');
 	}
  

    const csRegistry = await getAssetRegistry(phanphoi.cspp.getFullyQualifiedType());
    let csex = await csRegistry.exists(phanphoi.cspp.getIdentifier());
    if (csex == true) {
        pp.cspp = factory.newRelationship(namespace, 'CoSoPP', phanphoi.cspp.getIdentifier());
    } else {
        throw new Error("id CS phan phoi khong ton tai vui long kiem tra lai");
    };
    
   
    //Thong tin nhan san pham
    pp.soluongnhan = phanphoi.soluongnhan;
    pp.tgnhan = phanphoi.tgnhan;
    pp.masolonhan = phanphoi.masolonhan;
    pp.tennguoinhan = phanphoi.tennguoinhan;
    pp.phanloai = phanphoi.phanloai;
    pp.diadiemnhan = phanphoi.diadiemnhan;
    pp.masanpham = phanphoi.masanpham;

    //Thong tin giao san pham cho nha ban le 
    pp.soluonggiao = phanphoi.soluonggiao;
    pp.tggiao = phanphoi.tggiao;
    pp.masologiao = phanphoi.masologiao;
    pp.tennguoigiao = phanphoi.tennguoigiao;


    const ptRegistry = await getAssetRegistry(phanphoi.phuongtien.getFullyQualifiedType());
    let ptex = await ptRegistry.exists(phanphoi.phuongtien.getIdentifier());
    if (ptex == true) {
        pp.phuongtien = factory.newRelationship(namespace, 'PhuongTien', phanphoi.phuongtien.getIdentifier());
    } else {
        throw new Error("id Phuong tien khong ton tai vui long kiem tra lai");
    }

    if ((phanphoi.csbl.getFullyQualifiedType()) == (namespace + '.CoSoBL')) {
        const ttnRegistry = await getAssetRegistry(phanphoi.csbl.getFullyQualifiedType());
        let ttnex = await ttnRegistry.exists(phanphoi.csbl.getIdentifier());
        if (ttnex == true) {
            pp.csbl = factory.newRelationship(namespace, 'CoSoBL', phanphoi.csbl.getIdentifier());
        } else {
            throw new Error("id CS ban le nhan khong ton tai vui long kiem tra lai");
        };
    } else {
        throw new Error("Co so nhan phai la Co so ban le!");
    }

    if (s.npp.$identifier == phanphoi.nhaphanphoi.getIdentifier()) {
        pp.owner = factory.newRelationship(namespace, 'NhaPhanPhoi', phanphoi.nhaphanphoi.getIdentifier());
    } else {
        throw new Error("Owner khong khop voi nguoi tham gia san pham vui long kiem tra lai!");
    }
    //save the application
    const assetRegistry = await getAssetRegistry(pp.getFullyQualifiedType());
    

    //add id to truyxuatnoi
    const spn = phanphoi.sanphamnoi;
    const SanPhamNgoaiRegistry = await getAssetRegistry(phanphoi.sanphamngoai.getFullyQualifiedType());
    const spng = phanphoi.sanphamngoai;

    if (spn.status === 'giaidoan_phanphoi'){
        spn.status = 'giaidoan_banle';
        spng.status = 'giaidoan_banle';
        spn.dathem.push(factory.newRelationship(namespace, 'NhaPhanPhoi', phanphoi.nhaphanphoi.getIdentifier()));

        //them id giai doan vao truy xuat noi
        spn.truyxuatnoi.push(phanphoi.idgdpp);
        await SanPhamNoiRegistry.update(spn);

        //them co so vao truy xuat ngoai
        spng.truyxuatngoai.push(phanphoi.cspp.getIdentifier());
        await SanPhamNgoaiRegistry.update(spng);


        await assetRegistry.add(pp);
        // emit event
        const phanPhoiEvent = factory.newEvent(namespace, 'TaoGiaiDoanPhanPhoiEvent');
        phanPhoiEvent.sanpham = spng;
        emit(phanPhoiEvent);
    }
    else if (spn.status === 'hoantat'){
        throw new Error ('San pham da hoan tat cac giai doan vui long kiem tra lai!');
    }
    else {
        throw new Error ('Giai doan phan phoi chua duoc nhap');
    }
}