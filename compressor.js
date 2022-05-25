function compressAll(item_id = null, width = null, height = null, compress_lvl = 60, option = 'contain') {
    var compress_array = [];
    if (item_id !== null && typeof item_id === 'object') {
        try {
            var p1 = new Promise(function(resolve, reject) {
                for (var i = 0, numFiles = item_id.files.length; i < numFiles; i++) {
                    compress_array.push(compressImage(item_id.files[i], height, width, compress_lvl, option));
                }
                // console.log(item_id.files.length);
                setTimeout(() => resolve(compress_array), 2000);
                // resolve(compress_array);
            });
            return (p1.then(function(value) {
                console.log(value);
                return value;
            }));
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
                // imgtag.height = height;
                console.log(selectedFile);
                // document.body.append(imgtag);
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
                        console.log(original_height);
                        console.log(original_width);


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
        rere.then(function(value) {
            console.log(value);
            return value;
        });

        // var original_height, original_width;

        // var img_proto = new Image(255, 255);
        // img_proto.src = img.name;
        // console.log(img_proto);
        // document.body.append(img_proto);

        // var objectUrl = _URL.createObjectURL(img);
        // var rere = new Promise(function(resolve, reject) {
        //     img_proto.onload =
        //         function() {
        //             console.log('Promise start');
        //             original_height = this.height;
        //             original_width = this.width;
        //             _URL.revokeObjectURL(objectUrl);
        //             console.log(original_height);
        //             resolve(original_height);
        //         };
        // });
        // rere.then(function(value) {
        //     console.log(value);
        //     return value;
        // });
        // console.log('Promise ende');

        // var file_data = $("#category_image").prop('files')[index];
        // var can = document.createElement("canvas");
        // can.width = img.width * 2.5;
        // can.height = img.height * 2.5;
        // var ctx = can.getContext("2d");
        // ctx.drawImage(img, 0, 0, can.width, can.height);
        // file_data = can.toDataURL('image/jpeg', 100);
        // img.src = file_data;
        // if (index == 0) {
        //     mainImage = file_data;
        // } else {
        //     otherImage[index - 1] = file_data;
        // }
        // JotherImage = JSON.stringify(otherImage);
        // can.remove();

    }
}