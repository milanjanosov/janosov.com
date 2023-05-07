---
title: "Contact"
menu: main
weight: 3
networkConfig: 'config2.js'
---

<!-- https://formspree.io -->

<form class="contact-form" method="POST">
    <div class="contact-form__item contact-form__name">
        <label class="contact-form__label" for="name">Name</label>
        <input class="contact-form__text-input" type="text" name="name" id="name">
    </div>
    <div class="contact-form__item contact-form__email">
        <label class="contact-form__label" for="email">Email</label>
        <input class="contact-form__text-input" type="text" name="email" id="email">
    </div>
    <div class="contact-form__item contact-form__subject">
        <label class="contact-form__label" for="subject">Subject</label>
        <input class="contact-form__text-input" type="text" name="subject" id="subject">
    </div>
    <div class="contact-form__item contact-form__message">
        <label class="contact-form__label" for="message">Message</label>
        <textarea name="message" class="contact-form__message contact-form__textarea"></textarea>
    </div>
    <input type="submit" value="Send" class="contact-form__send button">
</form>
