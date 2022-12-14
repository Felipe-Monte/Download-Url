(function(){
    const inputUser = document.querySelector('#iurl');
    const btn = document.querySelector('button');

    btn.addEventListener('click', (e) => {
        e.preventDefault()
        btn.innerText = "Downloading File...";
        if (!inputUser.value){
            btn.innerText = 'Downloader File';
            return
        } 
        fetchFile(inputUser.value); 
    });

    function fetchFile(url){
        // fetching file & returning reponse as blob
        fetch(url).then(res => res.blob()).then(file => {
            // URL.createObjectURL creates a url of passed object
            let tempUrl = URL.createObjectURL(file);
            let aTag = document.createElement('a');
            aTag.href = tempUrl; // passing tempUrl as href value of <a> tag
            // passing file last & extension name as download value of <a> tag
            aTag.download = url.replace(/^.*[\\\/]/, '');
            document.body.appendChild(aTag); // adding <a> tag inside body
            aTag.click(); // clicking <a> tag so the file download
            aTag.remove(); // removing <a> tag once file dowloaded
            URL.revokeObjectURL(tempUrl);
            btn.innerText = "Download File.";
        }).catch(() => {
            // catch method will call if any error comes during downloading
            btn.innerText = 'Download File';
            alert('Failed to download file!');
        });
    }
})()