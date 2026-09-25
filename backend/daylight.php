<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');

$city = $_GET['city'] ?? '';

$data = [
    'Helsinki' => [ 
    'latitude' => 60.1699,
    'longitude' => 24.9384
], 'Tampere' => [
    'latitude' => 61.4978,
    'longitude' => 23.7610
], 'Turku' => [
    'latitude' => 60.4518,
    'longitude' => 22.2666
], 'Oulu' => [
    'latitude' => 65.0121,
    'longitude' => 25.4651
], 'Rovaniemi' => [
    'latitude' => 66.5031,
    'longitude' => 25.7270
], 'Utsjoki' => [
    'latitude' => 69.9076,
    'longitude' => 27.0252
], 'Vaasa' => [
    'latitude' => 63.0960,
    'longitude' => 21.6158
], 'Pietarsaari' => [
    'latitude' => 63.6800,
    'longitude' => 22.7000
], 'Kokkola' => [
    'latitude' => 63.8385,
    'longitude' => 23.1307
], 'Kuopio' => [
    'latitude' => 62.8924,
    'longitude' => 27.6770
], 'Joensuu' => [
    'latitude' => 62.6012,
    'longitude' => 29.7632
], 'Seinäjoki' => [
    'latitude' => 62.7915,
    'longitude' => 22.8484
], 'Hämeenlinna' => [
    'latitude' => 60.9960,
    'longitude' => 24.4643
], 'Jyväskylä' => [
    'latitude' => 62.2415,
    'longitude' => 25.7209
], 'Kouvola' => [
    'latitude' => 60.8667,
    'longitude' => 26.7000
], 'Kotka' => [
    'latitude' => 60.4723,
    'longitude' => 26.9396
], 'Lappeenranta' => [
    'latitude' => 61.0587,
    'longitude' => 28.1887
]
];

if (isset($data[$city])) {
    echo json_encode([
        'city' => $city,
        'latitude' => $data[$city]['latitude'],
        'longitude' => $data[$city]['longitude']
    ]);
} else {
    echo json_encode([
        'error' => 'City not found'
    ]);
}

?>