function compressAll(item_id = null, compress_lvl = 60) {
    if (item_id !== null && typeof item_id === 'object') {
        try {
            // TODO: Создать массив и его заполнять
            for (var i = 0, numFiles = item_id.files.length; i < numFiles; i++) {
                compressImage(item_id.files[numFiles], compress_lvl)
            }
            return (item_id);
        } catch (err) {
            console.error(err);
        }
        return false;
    } else return false;
}

function compressImage(img, compress_lvl) {
    var file_data = $("#category_image").prop('files')[index];
    var can = document.createElement("canvas");
    can.width = img.width * 2.5;
    can.height = img.height * 2.5;
    var ctx = can.getContext("2d");
    ctx.drawImage(img, 0, 0, can.width, can.height);
    file_data = can.toDataURL('image/jpeg', 100);
    img.src = file_data;
    if (index == 0) {
        mainImage = file_data;
    } else {
        otherImage[index - 1] = file_data;
    }
    JotherImage = JSON.stringify(otherImage);
    can.remove();
}