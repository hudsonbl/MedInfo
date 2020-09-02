#!/bin/bash
######################################################
######################################################
########    Author: Blake Hudson
########    File: Provides test queries for REST API
######################################################
######################################################
declare -a createuser
declare -a bearerToken

########################################################## User Creation and Login ##########################################################
for i in {1..1000}
do
    createuser[i]=$(curl -X POST "http://localhost:6000/users" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"name\":\"test mic\",\"email\":\"wolf${i}_${i}_${i}@wallstreet.edu\",\"password\":\"hunter2\"}" | jq -r '.vcode')
done

for i in {1..1000}
do
    bearerToken[i]=$(curl -X POST "http://localhost:6000/users/login/confirmation/${createuser[i]}" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"email\":\"wolf${i}_${i}_${i}@wallstreet.edu\",\"password\":\"hunter2\"}" | jq -r '.bearerToken')
done

########################################################## Add Allergies ##########################################################
for i in {4..1003}
do
    value=$(curl -X POST "http://localhost:6000/allergies/${i}" -H "Authorization: Bearer ${bearerToken[i-4]}" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"allergy\":\"skeet skeet ${i}\",\"symptoms\":\"hunter2\",\"medication\":\"money\"}" | jq -r '.successStatus')
done
########################################################## Add Doctor Visits ##########################################################
for i in {4..1003}
do
    value=$(curl -X POST "http://localhost:6000/doctor-visit/${i}" -H "Authorization: Bearer ${bearerToken[i-4]}" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"date\":\"${i}-2020\",\"clinicianName\":\"hunter2\",\"notes\":\"money\",\"bloodPressure\":\"goood\",\"heartRate\":\"good\"}" | jq -r '.successStatus')
done
########################################################## Add Chronic Health Issues ##########################################################
for i in {4..1003}
do
    value=$(curl -X POST "http://localhost:6000/chronic-health/${i}" -H "Authorization: Bearer ${bearerToken[i-4]}" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"condition\":\"skeet skeet ${i}\",\"notes\":\"hunter2hunter2hunter2hunter2hunter2hunter2hunter2\"}" | jq -r '.successStatus')
done
########################################################## Add Drug Prescriptions ##########################################################
for i in {4..1003}
do
    value=$(curl -X POST "http://localhost:6000/drug-prescription/${i}" -H "Authorization: Bearer ${bearerToken[i-4]}" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"name\":\"skeet skeet ${i}\",\"startdate\":\"${i}-2020\",\"enddate\":\"${i}-2021\",\"symptoms\":\"ogodogdogogdodgodgdgo\"}" | jq -r '.successStatus')
done
########################################################## Add Hospital Visits ##########################################################
for i in {4..1003}
do
    value=$(curl -X POST "http://localhost:6000/hospital-visit/${i}" -H "Authorization: Bearer ${bearerToken[i-4]}" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"date\":\"${i}-2020\",\"clinicianName\":\"hunter2\",\"notes\":\"money\"}" | jq -r '.successStatus')
done
########################################################## Add Immunization Records ##########################################################
for i in {4..1003}
do
    value=$(curl -X POST "http://localhost:6000/immunization-record/${i}" -H "Authorization: Bearer ${bearerToken[i-4]}" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"vaccine\":\"strain-${i}\",\"dateGiven\":\"${i}-2020\",\"administeredBy\":\"dr. ${i}\",\"nextDose\":\"${i}-2021\"}" | jq -r '.successStatus')
done