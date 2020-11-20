const base = "https://api-jasonandyun.herokuapp.com/"

const test= ()=>{
    let xhttp = new XMLHttpRequest();
    console.log("Working?")
    xhttp.open("GET",base, true)

    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status ==200) {
            console.log("this is working");
            console.log(this.responseText)
        }
    }


}