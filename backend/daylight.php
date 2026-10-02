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
], 'Pori' => [
    'latitude' => 61.4851,
    'longitude' => 21.7974
], 'Espoo' => [
    'latitude' => 60.2055,
    'longitude' => 24.6559
], 'Vantaa' => [
    'latitude' => 60.2934,
    'longitude' => 25.0378
], 'Kuusamo' => [
    'latitude' => 65.9646,
    'longitude' => 29.1888
], 'Inari' => [
    'latitude' => 68.9060,
    'longitude' => 27.0288
], 'Ivalo' => [
    'latitude' => 68.6590,
    'longitude' => 27.5389
], 'Kilpisjärvi' => [
    'latitude' => 69.0474,
    'longitude' => 20.7959
], 'Ilomantsi' => [
    'latitude' => 62.6716,
    'longitude' => 30.9328
], 'Ii' => [
    'latitude' => 65.3173,
    'longitude' => 25.3730
], 'Tornio' => [
    'latitude' => 65.8481,
    'longitude' => 24.1466
], 'Kajaani' => [
    'latitude' => 64.2273,
    'longitude' => 27.7285
], 'Varkaus' => [
    'latitude' => 62.3153,
    'longitude' => 27.8730
]
];

if (isset($data[$city])) {

    $latitude = $data[$city]['latitude'];
    $longitude = $data[$city]['longitude'];
    $city = $_GET['city'] ?? '';
    $year = $_GET['year'] ?? null;
    $startDate = $year . "-01-01";
    $endDate = $year . "-12-31";

    $url = "https://api.sunrise-sunset.org/v2"
        . "?lat=" . $latitude
        . "&lng=" . $longitude
        . "&date_start=" . $startDate
        . "&date_end=" . $endDate;

    $response = file_get_contents($url);

    $apiData = json_decode($response, true);

    echo json_encode([
        'city' => $city,
        'latitude' => $latitude,
        'longitude' => $longitude,
        'sun' => $apiData
    ]);

} else {

    echo json_encode([
        'error' => 'City not found'
    ]);

}
?>