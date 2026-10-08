<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');

$city = $_GET['city'] ?? '';
$year = $_GET['year'] ?? null;

$geocodeUrl = "https://geocoding-api.open-meteo.com/v1/search"
    . "?name=" . urlencode($city)
    . "&count=1"
    . "&countryCode=FI";

$response = file_get_contents($geocodeUrl);

$geocodeData = json_decode($response, true);

if (empty($geocodeData['results'])) {
    echo json_encode([
        'error' => 'City not found'
    ]);
    exit;
}

$location = $geocodeData['results'][0];

if (
    !in_array($location['feature_code'], [
        'PPLC',
        'PPLA',
        'PPLA2',
        'PPLA3',
        'PPLA4'
    ])
    ||
    strtolower($location['name']) !== strtolower($city)
) {
    echo json_encode([
        'error' => 'City not found'
    ]);
    exit;
}

$latitude = $location['latitude'];
$longitude = $location['longitude'];

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

?>