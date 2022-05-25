function compressAll(item_id = null, width = null, height = null, compress_lvl = 60, option = 'contain') {
    var compress_array = [];
    if (item_id !== null && typeof item_id === 'object') {
        try {
            for (var i = 0, numFiles = item_id.files.length; i < numFiles; i++) {
                var main_pr = new Promise(function(resolve, reject) {
                    resolve(compressImage(item_id.files[i], height, width, compress_lvl, option));
                });
                main_pr.then(function(value) {
                    compress_array.push(value);
                });
            }
            return compress_array;
        } catch (err) {
            console.error(err);
        }
        return false;
    } else return false;

    async function compressImage(img, width, height, compress_lvl, option) {
        var rere = new Promise(function(resolve, reject) {
            var reader = new FileReader();
            selectedFile = img;
            reader.onload = function(event) {
                var imgtag = new Image();
                imgtag.src = event.target.result;
                var objectUrl = URL.createObjectURL(img);
                imgtag.onload =
                    function() {
                        original_height = this.height;
                        original_width = this.width;
                        img = imgtag.cloneNode(true);
                        if (option === 'contain') {
                            if (original_height <= original_width) {
                                original_height = height * (original_height / original_width);
                                original_width = width;

                            } else if (original_height > original_width) {
                                original_width = width * (original_width / original_height);
                                original_height = height;
                            }
                        } else {
                            original_height = height;
                            original_width = width;
                        }
                        URL.revokeObjectURL(objectUrl);
                        var file_data = null;
                        var can = document.createElement("canvas");
                        can.width = original_width;
                        can.height = original_height;
                        var ctx = can.getContext("2d");
                        ctx.drawImage(img, 0, 0, can.width, can.height);
                        file_data = can.toDataURL('image/png', compress_lvl);
                        img.src = file_data;
                        document.body.append(img);
                        resolve(file_data);
                    };
            };
            reader.readAsDataURL(img);
        });
        return rere.then(function(value) {
            return value;
        });
    }
}