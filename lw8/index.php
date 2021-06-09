<?php

$current_url = $_SERVER['REQUEST_URI'];

function getData(){
    return json_decode(file_get_contents("db.json"), 1);
}

if ($current_url === "/"){
    echo '<a href="/products/">products</a>';
}
else if ($current_url === "/products/"){
    $products = getData();
    $output = [];
    foreach ($products as $product){
        $output[] = [
            'id' => $product['id'],
            'name' => $product['name'],
            'price' => $product['price'],
            'weight' => $product['weight']
        ];
    }
    echo json_encode($output);
}
else{
    $splited = explode('/', $current_url);
    if (count($splited) == 3){
        if (is_numeric(end($splited))){
            $products = getData();
            $output = [];
            foreach ($products as $product){
                if ($product['id'] == end($splited)){
                    unset($product['reviews']);
                    $output = $product;
                    break;
                }
            }
            if ($output)
                echo json_encode($output);
            else
                echo json_encode(['message' => 'info: not found']);
        }
        else
            echo json_encode(['message' => 'error: expected numeric id']);
    }
    else if (end($splited) === 'reviews'){
        $id = $splited[2];
        if (is_numeric($id)){
            $products = getData();
            $output = [];
            foreach ($products as $product){
                if ($product['id'] == $id){
                    $output = $product['reviews'];
                    break;
                }
            }
            if ($output)
                echo json_encode($output);
            else
                echo json_encode(['message' => 'info: not found']);
        }
        else
            echo json_encode(['message' => 'error: expected numeric id']);
    }
    else
        echo json_encode(['message' => 'error: bad routing']);
}