var panorama = player.panorama({
            PanoramaThumbnail: true, //enable panorama thumbnail
            KeyboardControl: true,
            clickToToggle: true,
            Notice: {
                Enable: true,
                Message: (isMobile())? "please drag and drop the video" : "please use your mouse drag and drop the video"
            },
            Markers: [
                // {
                //     location: {
                //         lat: 0,
                //         lon: 180
                //     },
                //     radius: 500,
                //     element: "This is text 1 with long text"
                // },
                // {
                //     location: {
                //         lat: 20,
                //         lon: 160
                //     },
                //     radius: 500,
                //     element: "This is text 2 with long text",
                //     onShow: function(){
                //         console.log("text 2 is shown");
                //     },
                //     onHide: function(){
                //         console.log("text 2 is hidden");
                //     }
                // }
            ],
            Animation: [
                // {
                //     keyPoint: 0,
                //     from: {
                //         lon: 180,
                //     },
                //     to:{
                //         lon: 540,
                //     },
                //     duration: 8000,
                //     ease: "linear",
                //     onComplete: function () {
                //         console.log("animation 1 is completed");
                //     }
                // },
                // {
                //     keyPoint: 0,
                //     from: {
                //         fov: 75,
                //     },
                //     to:{
                //         fov: 90,
                //     },
                //     duration: 5000,
                //     ease: "linear",
                // }
            ],
        });

