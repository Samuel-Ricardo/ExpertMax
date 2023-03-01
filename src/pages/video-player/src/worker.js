onmessage = ({ data }) => {
    console.log("Worker!", data)
    postMessage({'ok':'ok'})
}