/**
 * Create the participants needed for the demo
 * @param {org.hlfc.qlts.CreateDemoParticipants} createDemoParticipants - the CreateDemoParticipants transaction
 * @transaction
 */
async function createDemoParticipants() { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const namespace = 'org.hlfc.qlts';


    //Tao nguoi co the truy xuat nguon goc
    const anoRegistry = await getParticipantRegistry(namespace + '.Anonymous');
    const ano1 = factory.newResource(namespace, 'Anonymous', '1');
    await anoRegistry.add(ano1);

    //Tao nguoi tham gia nuoi trong giong
    const giongRegistry = await getParticipantRegistry(namespace + '.TrangTraiNuoiGiong');
    const giong1 = factory.newResource(namespace, 'TrangTraiNuoiGiong', 'trangtrainuoigiong1');
    giong1.fullname = 'trangtrainuoigiong';
    giong1.sdt = '12345667';
    giong1.email = 'giong1@gmail.com';
    giong1.tt = factory.newRelationship(namespace, 'TrangTraiNG', 'trangtraing1');
    await giongRegistry.add(giong1);


    // Tạo trang trại nuôi giống
    const tragtraiNGRegistry = await getAssetRegistry(namespace + '.TrangTraiNG');
    const tt1 = factory.newResource(namespace, 'TrangTraiNG', 'trangtraing1');
    tt1.tenTrangTrai = 'Trang trại nhà ông Hai';
    tt1.diachitt = 'Ấp An Thạnh, xã An Bình, Huyện Long Hồ, Tỉnh Vĩnh Long';
    tt1.sdt = '0123456789';
    tt1.email = 'onghai@gmail.com';
    tt1.cmnd = '8898989898';
    tt1.ao = ['aong1', 'aong2'];
    tt1.mota = 'Trang trại chuyên cung cấp con giống khỏe, chất lượng đảm bảo tiêu chuẩn nuôi trồng.';
    tt1.owner = factory.newRelationship(namespace, 'TrangTraiNuoiGiong', 'trangtrainuoigiong1');
    await tragtraiNGRegistry.add(tt1);

    //Tạo Ao 1 nuoi giong
    const aoNGRegistry = await getAssetRegistry(namespace + '.AoNG');
    const aong1 = factory.newResource(namespace, 'AoNG', 'aong1');
    aong1.tenAo = 'Ao giống cá da trơn 1';
    aong1.dientich = '1000'; //m2
    aong1.trangtrai = factory.newRelationship(namespace, 'TrangTraiNG', 'trangtraing1');
    aong1.owner = factory.newRelationship(namespace, 'TrangTraiNuoiGiong', 'trangtrainuoigiong1');
    await aoNGRegistry.add(aong1);

    //Tạo Ao 2 nuoi giong
    const aong2 = factory.newResource(namespace, 'AoNG', 'aong2');
    aong2.tenAo = 'Ao giống cá da trơn 2';
    aong2.dientich = '3000'; //m2
    aong2.trangtrai = factory.newRelationship(namespace, 'TrangTraiNG', 'trangtraing1');
    aong2.owner = factory.newRelationship(namespace, 'TrangTraiNuoiGiong', 'trangtrainuoigiong1');
    await aoNGRegistry.add(aong2);





    //Tao nguoi tham gia nuoi nguyen lieu
    const nlRegistry = await getParticipantRegistry(namespace + '.TrangTraiNuoiNguyenLieu');
    const trangtrainl = factory.newResource(namespace, 'TrangTraiNuoiNguyenLieu', 'trangtrainguyenlieu1');
    trangtrainl.fullname = 'trangtrainguyenlieu';
    trangtrainl.sdt = '12345667';
    trangtrainl.email = 'trangtrainl@gmail.com';
    trangtrainl.tt = factory.newRelationship(namespace, 'TrangTraiNNL', 'trangtrainl1');
    await nlRegistry.add(trangtrainl);


    //Tạo trang trại nuôi nguyên liệu
    const tragtraiNNLRegistry = await getAssetRegistry(namespace + '.TrangTraiNNL');
    const tt2 = factory.newResource(namespace, 'TrangTraiNNL', 'trangtrainl1');
    tt2.tenTrangTrai = 'Trang trại nhà ông Tư';
    tt2.diachitt = 'Ấp Phong Thuận, Xã Tân Mỹ Chánh, TP Mỹ Tho, Tỉnh Tiền Giang';
    tt2.sdt = '0987654321';
    tt2.email = 'ongtu@gmail.com';
    tt2.cmnd = '676767677';
    tt2.ao = ['aonl1', 'aonl2'];
    tt2.mota = 'Trang trại chuyên cung cấp các loại cá đủ tiêu chuẩn, chất lượng, đảm bảo tiêu chuẩn nuôi trồng.';
    tt2.owner = factory.newRelationship(namespace, 'TrangTraiNuoiNguyenLieu', 'trangtrainguyenlieu1');
    await tragtraiNNLRegistry.add(tt2);

    //Tao Ao 1 nuoi nguyen lieu
    const aoNLRegistry = await getAssetRegistry(namespace + '.AoNNL');
    const aonl1 = factory.newResource(namespace, 'AoNNL', 'aonl1');
    aonl1.tenAo = 'Ao cá Tra nguyên liệu 1';
    aonl1.dientich = '2000'; //m2
    aonl1.trangtrai = factory.newRelationship(namespace, 'TrangTraiNNL', 'trangtrainl1');
    aonl1.owner = factory.newRelationship(namespace, 'TrangTraiNuoiNguyenLieu', 'trangtrainguyenlieu1');
    await aoNLRegistry.add(aonl1);

    //Tao Ao 2 nuoi nguyen lieu
    const aonl2 = factory.newResource(namespace, 'AoNNL', 'aonl2');
    aonl2.tenAo = 'Ao cá Tra nguyên liệu 2';
    aonl2.dientich = '5000'; //m2
    aonl2.trangtrai = factory.newRelationship(namespace, 'TrangTraiNNL', 'trangtrainl1');
    aonl2.owner = factory.newRelationship(namespace, 'TrangTraiNuoiNguyenLieu', 'trangtrainguyenlieu1');
    await aoNLRegistry.add(aonl2);





    //Tao nguoi tham gia che bien
    const cbRegistry = await getParticipantRegistry(namespace + '.NhaCheBien');
    const chebien1 = factory.newResource(namespace, 'NhaCheBien', 'chebien1');
    chebien1.fullname = 'nhachebien';
    chebien1.sdt = '12345667';
    chebien1.email = 'chebien1@gmail.com';
    chebien1.cscb = factory.newRelationship(namespace, 'CoSoCB', 'cosocb1');
    await cbRegistry.add(chebien1);

    //Tao co so che bien
    const csCBRegistry = await getAssetRegistry(namespace + '.CoSoCB');
    const cs1 = factory.newResource(namespace, 'CoSoCB', 'cosocb1');
    cs1.tenCoSo = 'Cơ sở chế biến cá da trơn Hòa Phú';
    cs1.diachics = 'Khu công nghiệp Hòa Phú, xã Hòa Phú, Huyện Tam Bình, Tỉnh Vĩnh Long';
    cs1.sdt = '0123456789';
    cs1.email = 'ctyHP@gmail.com';
    cs1.cmnd = '1212121212';
    cs1.mota = 'Cơ sở chế biến cá da trơn, chuyên cung cấp sản phẩm chất lượng, an toàn vệ sinh thực phẩm.';
    cs1.owner = factory.newRelationship(namespace, 'NhaCheBien', 'chebien1');
    await csCBRegistry.add(cs1);






    //Tao nguoi tham gia phan phoi
    const ppRegistry = await getParticipantRegistry(namespace + '.NhaPhanPhoi');
    const phanphoi1 = factory.newResource(namespace, 'NhaPhanPhoi', 'phanphoi1');
    phanphoi1.fullname = 'nhaphanphoi';
    phanphoi1.sdt = '12345667';
    phanphoi1.email = 'phanphoi1@gmail.com';
    phanphoi1.cspp = factory.newRelationship(namespace, 'CoSoPP', 'cosopp1');
    await ppRegistry.add(phanphoi1);

    //Tao co so phan phoi
    const csPPRegistry = await getAssetRegistry(namespace + '.CoSoPP');
    const cs2 = factory.newResource(namespace, 'CoSoPP', 'cosopp1');
    cs2.tenCoSo = 'Cơ sở phân phối cá da trơn Hòa An';
    cs2.diachics = 'Khu công nghiệp Hòa Phú, xã Hòa Phú, Huyện Tam Bình, Tỉnh Vĩnh Long';
    cs2.sdt = '0123456789';
    cs2.email = 'ctyHA@gmail.com';
    cs2.cmnd = '3434343434';
    cs2.mota = 'Chuyên phân phối các sản phẩm nhanh chóng, bao bì đẹp mắt, đảm bảo tiêu chuẩn an toàn vệ sinh thực phẩm.';
    cs2.owner = factory.newRelationship(namespace, 'NhaPhanPhoi', 'phanphoi1');
    await csPPRegistry.add(cs2);






    //Tao nguoi tham gia ban le
    const blRegistry = await getParticipantRegistry(namespace + '.NhaBanLe');
    const banle1 = factory.newResource(namespace, 'NhaBanLe', 'banle1');
    banle1.fullname = 'nhabanle';
    banle1.sdt = '12345667';
    banle1.email = 'banle1@gmail.com';
    banle1.csbl = factory.newRelationship(namespace, 'CoSoBL', 'cosobl1');
    await blRegistry.add(banle1);


    //Tao co so ban le
    const csBLRegistry = await getAssetRegistry(namespace + '.CoSoBL');
    const cs3 = factory.newResource(namespace, 'CoSoBL', 'cosobl1');
    cs3.tenCoSo = 'Tạp hóa cô Bảy';
    cs3.diachics = 'Ấp An Thạnh, xã An Bình, Huyện Long Hồ, Tỉnh Vĩnh Long';
    cs3.sdt = '0123456789';
    cs3.email = 'cobay@gmail.com';
    cs3.cmnd = '889832228';
    cs3.mota = 'Chuyên bán tạp hóa các loại';
    cs3.owner = factory.newRelationship(namespace, 'NhaBanLe', 'banle1');
    await csBLRegistry.add(cs3);








    //Tao Nguyen Lieu
    const nglieuRegistry = await getAssetRegistry(namespace + '.NguyenLieu');
    const nglieu1 = factory.newResource(namespace, 'NguyenLieu', 'cabasa');
    nglieu1.tennguyenlieu = 'Cá Ba Sa';
    nglieu1.ghichu = 'Cá BaSa khi chọn giống phải là những con khỏe mạnh, màu sắc tươi sáng, không có dấu hiệu bệnh tật hay xây xát và có kích cỡ đều nhau để tránh tình trạng tăng trưởng không đồng đều.'
    await nglieuRegistry.add(nglieu1);

    const nglieu2 = factory.newResource(namespace, 'NguyenLieu', 'cachimtrang');
    nglieu2.tennguyenlieu = 'Cá Chim trắng';
    nglieu2.ghichu = 'Cá chim trắng sống ở nhiệt độ 25 - 30 độ C, ăn tạp.'
    await nglieuRegistry.add(nglieu2);

    const nglieu3 = factory.newResource(namespace, 'NguyenLieu', 'caloc');
    nglieu3.tennguyenlieu = 'Cá Lóc';
    nglieu3.ghichu = 'Cá Lóc Nuôi ở nhiệt độ trên 20 độ C cá sinh trưởng nhanh, dưới 15 độ C sinh trưởng chậm.'
    await nglieuRegistry.add(nglieu3);

    const nglieu4 = factory.newResource(namespace, 'NguyenLieu', 'cachem');
    nglieu4.tennguyenlieu = 'Cá Chẽm';
    nglieu4.ghichu = 'Cá Chẽm ăn cá tạp.'
    await nglieuRegistry.add(nglieu4);








    //Tao Phuong Tien
    const ptRegistry = await getAssetRegistry(namespace + '.PhuongTien');
    const pt1 = factory.newResource(namespace, 'PhuongTien', 'xetai1');
    pt1.tenphuongtien = 'Xe tải HuynDai 5 tấn';
    pt1.loaipt = "Xe";
    pt1.taitrong = '5000'; //kg
    pt1.bienso = 'HA-222.51';
    await ptRegistry.add(pt1);

    const pt2 = factory.newResource(namespace, 'PhuongTien', 'xetai2');
    pt2.tenphuongtien = 'Xe tải Volvo 1 tấn';
    pt2.loaipt = "Xe";
    pt2.taitrong = '1000'; //kg
    pt2.bienso = 'CA15-134.51';
    await ptRegistry.add(pt2);

    const pt3 = factory.newResource(namespace, 'PhuongTien', 'xetai3');
    pt3.tenphuongtien = 'Xe tải ISUZU 8 tấn';
    pt3.loaipt = "Xe";
    pt3.taitrong = '8000'; //kg
    pt3.bienso = 'MS15-661.51';
    await ptRegistry.add(pt3);


    const pt4 = factory.newResource(namespace, 'PhuongTien', 'tau1');
    pt4.tenphuongtien = 'Ghe chở cá 25 tấn';
    pt4.loaipt = "Tau";
    pt4.taitrong = '25000'; //kg
    pt4.bienso = 'TCC22-777.51';
    await ptRegistry.add(pt4);
}