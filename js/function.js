(function($) {
    "use strict";

    var $window = $(window);
    var $body = $('body');

    /* Preloader Effect */
    if ($('.mil-preloader').length && typeof gsap !== 'undefined') {
        var timeline = gsap.timeline();

        timeline.to(".mil-preloader-animation", {
            opacity: 1,
        });

        timeline.fromTo(
            ".mil-animation-1 .mil-h3", {
                y: "30px",
                opacity: 0
            }, {
                y: "0px",
                opacity: 1,
                stagger: 0.4
            }
        );

        timeline.to(".mil-animation-1 .mil-h3", {
            opacity: 0,
            y: '-30',
        }, "+=.3");

        timeline.fromTo(".mil-reveal-box", 0.1, {
            opacity: 0,
        }, {
            opacity: 1,
            x: '-30',
        });

        timeline.to(".mil-reveal-box", 0.45, {
            width: "100%",
            x: 0,
        }, "+=.1");

        timeline.to(".mil-reveal-box", {
            right: "0"
        });

        timeline.to(".mil-reveal-box", 0.3, {
            width: "0%"
        });

        timeline.fromTo(".mil-animation-2 .mil-h3", {
            opacity: 0,
        }, {
            opacity: 1,
        }, "-=.5");

        timeline.to(".mil-animation-2 .mil-h3", 0.6, {
            opacity: 0,
            y: '-30'
        }, "+=.5");

        timeline.to(".mil-preloader", 0.8, {
            opacity: 0,
            ease: 'sine',
            onComplete: function() {
                $('.mil-preloader').addClass("mil-hidden");
            }
        }, "+=.2");
    } else {
        $window.on('load', function() {
            $(".preloader, .mil-preloader").fadeOut(600);
        });
    }

    /* Sticky Header */
    if ($('.active-sticky-header').length) {
        $window.on('resize', function() {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.main-header").css("height", $('header .header-sticky').outerHeight());
        }

        $(window).on("scroll", function() {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $('header .header-sticky').outerHeight()
            $("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
            $("header .header-sticky").toggleClass("active", (fromTop > 600));
        });
    }

    /* Slick Menu JS */
    $('#menu').slicknav({
        label: '',
        prependTo: '.responsive-menu'
    });

    if ($("a[href='#top']").length) {
        $("a[href='#top']").click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    }

    /* Hero Slider Layout JS */
    const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
    });

    /* testimonial Slider JS */
    if ($('.testimonial-slider').length) {
        const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                }
            }
        });
    }

    /* Skill Bar */
    if ($('.skills-progress-bar').length) {
        $('.skills-progress-bar').waypoint(function() {
            $('.skillbar').each(function() {
                $(this).find('.count-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });
        }, {
            offset: '70%'
        });
    }

    /* Youtube Background Video JS */
    if ($('#herovideo').length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 6,
            time: 3000
        });
    }

    /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

    /* Parallaxie js */
    var $parallaxie = $('.parallaxie');
    if ($parallaxie.length && ($window.width() > 991)) {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    }

    /* Zoom Gallery screenshot */
    $('.gallery-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({
        focus: false
    }).on("submit", function(event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-process.php",
            data: $contactform.serialize(),
            success: function(text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $contactform[0].reset();
        submitMSG(true, "Message Sent Successfully!")
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Contact form validation end */

    /* Appointment form validation */
    var $appointmentForm = $("#appointmentForm");
    $appointmentForm.validator({
        focus: false
    }).on("submit", function(event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitappointmentForm();
        }
    });

    function submitappointmentForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-appointment.php",
            data: $appointmentForm.serialize(),
            success: function(text) {
                if (text == "success") {
                    appointmentformSuccess();
                } else {
                    appointmentsubmitMSG(false, text);
                }
            }
        });
    }

    function appointmentformSuccess() {
        $appointmentForm[0].reset();
        appointmentsubmitMSG(true, "Message Sent Successfully!")
    }

    function appointmentsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-success";
        } else {
            var msgClasses = "h3 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Appointment form validation end */

    /* Animated Wow Js */
    new WOW().init();

    /* Popup Video */
    if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }

    /* Interactive Partner Details Panel */
    if ($('.our-expertise').length) {
        var partnersData = {
            axis: {
                title: 'Axis Communications',
                url: 'https://www.axis.com',
                urlText: 'www.axis.com',
                desc: 'Axis Communications AB is a Swedish manufacturer of network cameras for the physical security and video surveillance industry. A wide range of network video surveillance solutions including cameras and encoders, Video Management Software and recorders, analytics and applications. Axis IP-based portfolio ensures scalability and simplifies integration.'
            },
            iss: {
                title: 'ISS Intelligent Security Systems',
                url: 'https://www.issivs.com',
                urlText: 'www.issivs.com',
                desc: 'The ISS SecurOS solution set powers the most advanced video management and video analytics VMS in the surveillance world. ISS is the proven technology partner of the world’s largest integrators in the video security and surveillance marketplace with deployments in transportation, retail, banking, colleges, government, industry, and urban surveillance.'
            },
            milestone: {
                title: 'Milestone Systems',
                url: 'https://www.milestonesys.com',
                urlText: 'www.milestonesys.com',
                desc: 'Milestone designs, develops and produces world-leading IP-based video management solutions for organizations of all sizes. Milestone Systems is a global leader within open platform video management software (VMS) for IP network-based video surveillance, dedicated to delivering high quality business video platform software.'
            },
            veracity: {
                title: 'Veracity',
                url: 'https://www.veracityglobal.com',
                urlText: 'www.veracityglobal.com',
                desc: 'Veracity IP Transmission Products & Video Storage Distributors listing in UK, USA, Middle East and India. Veracity designs and manufactures industry-leading IP transmission devices, POE, EOC adapters and extenders and IP camera installation tools, IP video storage systems, and integrated command + control systems.'
            },
            ruijie: {
                title: 'Ruijie Networks',
                url: 'https://www.ruijienetworks.com',
                urlText: 'www.ruijienetworks.com',
                desc: 'Ruijie Networks has 41 branches with sales and service covering Asia, Europe, North America, and South America. Since founded in 2000, Ruijie has researched and self-developed 8 product lines, including switches, routers, wireless, cloud class, security, gateways, IT management and authentication & accounting.'
            },
            netgear: {
                title: 'Netgear',
                url: 'https://www.netgear.com',
                urlText: 'www.netgear.com',
                desc: 'Netgear Inc. is a multinational computer networking company based in San Jose, California, with offices in about 25 countries. It produces networking hardware for consumers, businesses, and service providers operating across retail, commercial, and service provider segments.'
            },
            multimedia: {
                title: 'Multimedia Connect',
                url: 'https://www.multimedia-connect.com',
                urlText: 'www.multimedia-connect.com',
                desc: 'Leader on the French market, Multimedia Connect is rapidly expanding its activities in EMEA and Asia. Multimedia Connect is a structured cabling system manufacturer, designing and producing communication solutions for intelligent buildings that enhances IP convergence.'
            },
            systemmax: {
                title: 'System Max',
                url: 'https://www.system-max.com',
                urlText: 'www.system-max.com',
                desc: 'Systemmax Rack is your shield that protects your valuable machines that contain the most valuable thing in your systems. Operating in major Middle East cities (Cairo – Dubai – Doha), providing full life-cycle IT services and end-to-end IP video management surveillance solutions.'
            },
            tiandy: {
                title: 'Tiandy Technology',
                url: 'https://www.tiandy.com',
                urlText: 'www.tiandy.com',
                desc: 'Tiandy Technologies is a globally recognized provider of advanced video surveillance and security solutions. With a strong focus on innovation, AI, intelligent video analytics, and high-quality imaging, Tiandy delivers comprehensive IP cameras, NVRs, VMS, and intelligent security platforms.'
            }
        };

        // Our Expertise Defaults
        var defaultExpTitle = 'Collaborating with <span>Industry Leaders</span>';
        var defaultExpDesc = 'Collaborating closely with the industry’s largest professional network, we create unlimited opportunities to grow your business with our partners.';

        function resetExpertiseSection() {
            $('.our-expertise .expertise-item').removeClass('active');
            var $content = $('.our-expertise-content');
            $content.css('transition', 'opacity 0.2s ease').css('opacity', '0.3');
            setTimeout(function() {
                $content.find('.partner-title').html(defaultExpTitle);
                $content.find('.partner-desc').html(defaultExpDesc);
                $content.find('.expertise-btn').stop(true, true).fadeOut(200);
                $content.css('opacity', '1');
            }, 150);
        }

        // Expertise Item Hover / Click
        $(document).on('mouseenter click', '.our-expertise .expertise-item', function() {
            var partnerKey = $(this).attr('data-partner');
            var data = partnersData[partnerKey];
            if (!data) return;

            $('.our-expertise .expertise-item').removeClass('active');
            $(this).addClass('active');

            var $content = $('.our-expertise-content');
            $content.css('transition', 'opacity 0.2s ease').css('opacity', '0.3');
            setTimeout(function() {
                $content.find('.partner-title').html(data.title);
                $content.find('.partner-desc').html(data.desc);
                $content.find('.partner-link').attr('href', data.url).html('visit ' + data.urlText + ' <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>');
                $content.find('.expertise-btn').stop(true, true).fadeIn(300);
                $content.css('opacity', '1');
            }, 150);
        });

        $(document).on('mouseleave', '.our-expertise', function() {
            resetExpertiseSection();
        });
    }

})(jQuery);