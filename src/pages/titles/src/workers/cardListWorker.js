onmessage = ({ data }) => {
    console.log(data);

    let counter = 0;
    

        console.log('activating blocking operation...', data.maxItems)
        console.time('blocking-op')
        // blocking function
        // 1e5 = 100.000
        for (counter; counter < data.maxItems; counter++) console.log('.')
        console.timeEnd('blocking-op')



    postMessage({response: "ok :D", data: counter})
}