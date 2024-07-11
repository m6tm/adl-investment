{{-- Ceci est le fichier d'implémentation du footer du site web
il est appelé dans le fichier layout.app  --}}

<link rel="stylesheet" href="{{ asset('assets/css/partials/footer.css') }}">

<div class="container-md footer-bottom">
    <div class="row gy-4">
        <div class="col-lg-5 col-md-12 footer-about">
            <a href="index.html" class="logo d-flex align-items-center">
                <span class="sitename">Impact</span>
            </a>
            <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies
                darta donna mare fermentum iaculis eu non diam phasellus.</p>
            <div class="social-links d-flex mt-4">
                <a href="#"><i class="bi bi-facebook"></i></a>
                <a href="#"><i class="bi bi-youtube"></i></a>
                <a href="#"><i class="bi bi-telegram"></i></a>
                <a href="#"><i class="bi bi-instagram"></i></a>
                <a href="#"><i class="bi bi-linkedin"></i></a>
            </div>
        </div>

        <div class="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Privacy policy</a></li>
            </ul>
        </div>

        <div class="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
            </ul>
        </div>

        <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>A108 Adam Street</p>
            <p>New York, NY 535022</p>
            <p>United States</p>
            <p class="mt-4"><strong>Phone:</strong> <span>+000 000000</span></p>
            <p><strong>Email:</strong> <span>info@example.com</span></p>
        </div>

    </div>
</div>

<div class="container copyright text-center mt-4 ">
    <p>© <span>Copyright</span> <strong class="px-1 sitename">2024</strong> <span>All Rights Reserved</span></p>
    <div class="credits">
        Designed by <a href="">Dev Group</a>
    </div>
</div>
