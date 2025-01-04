<?php

function getCCType($cardNumber) {
    $cardNumber = preg_replace('/\D/', '', $cardNumber);

    $len = strlen($cardNumber);
    if ($len < 15 || $len > 16) {
        return 'desconhecido';
    }else{
        switch($cardNumber) {
            case(preg_match ('/^4/', $cardNumber) >= 1):
                return 'visa';
            case(preg_match ('/^5[1-5]/', $cardNumber) >= 1):
                return 'mastercard';
            case(preg_match ('/^3[47]/', $cardNumber) >= 1):
                return 'amex';
            case(preg_match ('/^3(?:0[0-5]|[68])/', $cardNumber) >= 1):
                return 'dinersclub';
            case(preg_match ('/^6(?:011|5)/', $cardNumber) >= 1):
                return 'discover';
            case(preg_match ('/^(?:2131|1800|35\d{3})/', $cardNumber) >= 1):
                return 'jcb';
            default:
                return 'elo';
        }
    }
}
