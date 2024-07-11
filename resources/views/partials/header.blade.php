{{-- Ceci est le fichier d'implémentation du header du site web;
il est appelé dans le fichier layout.app  --}}

<link rel="stylesheet" href="{{ asset('assets/css/partials/header.css') }}">


<div class="topbar d-flex align-items-center">
    <div class="container d-flex justify-content-center justify-content-md-between">
        <div class="contact-info d-flex align-items-center">
            <i class="bi bi-phone d-flex align-items-center "><span>+1 5589 55488 55</span></i>
            <i class="bi bi-envelope d-flex align-items-center ms-4"><a
                    href="mailto:contact@example.com">contact@example.com</a></i>
        </div>
        <div class="social-links d-none d-md-flex align-items-center">
            <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="twitter"><i class="bi bi-youtube"></i></a>
            <a href="#" class="twitter"><i class="bi bi-telegram"></i></a>
            <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>

        <div class="form-info d-flex align-items-center">
            <ul class="list-unstyled d-flex m-0">
                <li class="m-3 pl-3">
                    <a href="#" class="text-white d-flex align-items-center">
                        <i class="bi bi-person-fill me-2 text-white"></i> Login
                    </a>
                </li>
                <li class="m-3 pl-3">
                    <a href="#" class="text-white d-flex align-items-center">
                        <i class="bi bi-pencil-square me-2 text-white"></i>Register
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div><!-- End Top Bar -->

<div class="branding d-flex align-items-cente">

    <div class="container position-relative d-flex align-items-center justify-content-between">
        <a href="index.html" class="logo d-flex align-items-center">
            <!-- Uncomment the line below if you also wish to use an image logo -->
            <!-- <img src="assets/img/logo.png" alt=""> -->
            <h1 class="sitename">ADL</h1>
            <span>.</span>
        </a>
        {{-- Implémentation du menu: n'ayant pas tous les élément, il faudra remplacer les termes "partie {1}" par les termes appropriés  --}}
        <nav id="navmenu" class="navmenu">
            <ul>
                <li><a href="#hero" class="active">Home<br></a></li>
                <li class="dropdown"> <a href="#"><span>About</span> <i
                            class="bi bi-chevron-down toggle-dropdown"></i> </a>
                    <ul>
                        <li><a href="#aboutus">About Us</a></li>
                        <li class="dropdown">
                            <a href="#team"><span>Agents</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                            <ul>
                                <li><a href="#">Partie 1</a></li>
                                <li><a href="#">Partie 2</a></li>
                            </ul>
                        </li>
                        <li><a href="#team">Contact Us</a></li>
                        <li><a href="#pricing">Pricing policy</a></li>
                        <li><a href="#refund">Refund policy</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                    </ul>
                </li>
                <li><a href="#services">Services</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#team">Team</a></li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
    </div>
</div>
