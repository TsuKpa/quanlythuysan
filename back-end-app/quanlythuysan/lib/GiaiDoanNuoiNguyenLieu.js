/**
 * 
 * @param {org.hlfc.qlts.TaoGiaiDoanNuoiNguyenLieu} nngl
 * @transaction
 */

async function TaoGiaiDoanNuoiNguyenLieu(nngl) { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const namespace = 'org.hlfc.qlts';

    const nuoingl = factory.newResource(namespace, 'GiaiDoanNuoiNguyenLieu', nngl.idgdnnl);

    const SanPhamNoiRegistry = await getAssetRegistry(nngl.sanphamnoi.getFullyQualifiedType());
    let ex = await SanPhamNoiRegistry.exists(nngl.sanphamnoi.getIdentifier());  
    let s = await SanPhamNoiRegistry.get(nngl.sanphamnoi.getIdentifier());
  
    if ((nngl.sanphamnoi.getIdentifier() == nngl.sanphamngoai.getIdentifier()) && ex == true) {
        nuoingl.sanphamnoi = factory.newRelationship(namespace, 'SanPhamNoi', nngl.sanphamnoi.getIdentifier());
        nuoingl.sanphamngoai = factory.newRelationship(namespace, 'SanPhamNgoai', nngl.sanphamngoai.getIdentifier());
    } else {
        throw new Error("Id san pham noi khong khop san pham ngoai hoac khong ton tai!")
    }


  	if(s.nguyenlieu.$identifier == nngl.nguyenlieu.$identifier){
    	nuoingl.nguyenlieu = factory.newRelationship(namespace,'NguyenLieu',nngl.nguyenlieu.getIdentifier());
    }
  	else {
    	throw new Error ('Nguyen lieu khong khop vui long kiem tra lai!');
 	}
    

    const aoRegistry = await getAssetRegistry(nngl.ao.getFullyQualifiedType());
    let aoex = await aoRegistry.exists(nngl.ao.getIdentifier());
    if (aoex == true) {
        nuoingl.ao = factory.newRelationship(namespace, 'AoNNL', nngl.ao.getIdentifier());
    } else {
        throw new Error("id Ao khong ton tai vui long kiem tra lai");
    }

    const ttRegistry = await getAssetRegistry(nngl.trangtrai.getFullyQualifiedType());
    let ttex = await ttRegistry.exists(nngl.trangtrai.getIdentifier());
    if (ttex == true) {
        nuoingl.trangtrai = factory.newRelationship(namespace, 'TrangTraiNNL', nngl.trangtrai.getIdentifier());
    } else {
        throw new Error("id Trang trai khong ton tai vui long kiem tra lai");
    }
    


    nuoingl.tgnhangiong = nngl.tgnhangiong;
    nuoingl.tgxuatao = nngl.tgxuatao;
    

    const ptRegistry = await getAssetRegistry(nngl.phuongtien.getFullyQualifiedType());
    let ptex = await ptRegistry.exists(nngl.phuongtien.getIdentifier());
    if (ptex == true) {
        nuoingl.phuongtien = factory.newRelationship(namespace, 'PhuongTien', nngl.phuongtien.getIdentifier());
    } else {
        throw new Error("id Phuong tien khong ton tai vui long kiem tra lai");
    }


    if ((nngl.cscb.getFullyQualifiedType()) == (namespace + '.CoSoCB')) {
        const ttnRegistry = await getAssetRegistry(nngl.cscb.getFullyQualifiedType());
        let ttnex = await ttnRegistry.exists(nngl.cscb.getIdentifier());
        if (ttnex == true) {
            nuoingl.cscb = factory.newRelationship(namespace, 'CoSoCB', nngl.cscb.getIdentifier());
        } else {
            throw new Error("id CS che bien nhan khong ton tai vui long kiem tra lai");
        };
    } else {
        throw new Error("Co so nhan phai la Co so che bien!");
    }

    
    nuoingl.soluong = nngl.soluong;
    nuoingl.mota = nngl.mota;

  
    if (s.ttnnl.$identifier == nngl.trangtrainuoinguyenlieu.getIdentifier()) {
        nuoingl.owner = factory.newRelationship(namespace, 'TrangTraiNuoiNguyenLieu', nngl.trangtrainuoinguyenlieu.getIdentifier());
    } else {
        throw new Error("Owner khong khop voi nguoi tham gia san pham vui long kiem tra lai!");
    }



    const assetRegistry = await getAssetRegistry(nuoingl.getFullyQualifiedType());
    
    
    const SanPhamNgoaiRegistry = await getAssetRegistry(nngl.sanphamngoai.getFullyQualifiedType());
    const spng = nngl.sanphamngoai;
    const spn = nngl.sanphamnoi;


    if (spn.status === 'giaidoan_nuoinguyenlieu'){
        spn.status = 'giaidoan_chebien';
        spng.status = 'giaidoan_chebien';

        spn.dathem.push(factory.newRelationship(namespace, 'TrangTraiNuoiNguyenLieu', nngl.trangtrainuoinguyenlieu.getIdentifier()));
        
        //them id giai doan vao truy xuat noi
        spn.truyxuatnoi.push(nngl.idgdnnl);
        await SanPhamNoiRegistry.update(spn);

        //them trang trai vao truy xuat ngoai
        spng.truyxuatngoai.push(nngl.trangtrai.getIdentifier());
        await SanPhamNgoaiRegistry.update(spng);


        await assetRegistry.add(nuoingl);
        // emit event
        const nuoiNLEvent = factory.newEvent(namespace, 'TaoGiaiDoanNuoiNguyenLieuEvent');
        nuoiNLEvent.sanpham = spng;
        emit(nuoiNLEvent);
    }
    else if (spn.status === 'hoantat'){
        throw new Error ('San pham da hoan tat cac giai doan vui long kiem tra lai!');
    }
    else {
        throw new Error ('Giai doan nuoi nguyen lieu chua duoc nhap');
    }
}