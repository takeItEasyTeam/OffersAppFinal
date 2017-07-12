/* globals $ */
$('document').ready((req, res) => {
    const file = $('#file');
        file.on('change', () => {
            const images = file[0].files;
            if (images.length > 3) {
                file.val('');
            } else {
            showImage(file);
            }
        });

        function showImage(input) {
            const fileList = input[0];
            if (fileList.files && fileList.files[0]) {
                const imgContainer = $('#imgContainer');
                imgContainer.empty();
                for (const image of fileList.files) {
                    const fileReader = new FileReader();
                    fileReader.onload = function(e) {
                        $('<img>')
                        .attr('class', 'offer-image')
                        .attr('src', e.target.result)
                        .addClass('img-thumbnail')
                        .appendTo(imgContainer);
                    };
                    fileReader.readAsDataURL(image);
                }
            }
        }
});
