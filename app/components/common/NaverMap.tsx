"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getAddresses } from '@/lib/features/room/address.slice';
import { AddressModel } from '@/app/model/room/address.model';


const NaverMap = () => {
    const addresses = useSelector(getAddresses)

    let map: naver.maps.Map; // 'map' 변수를 useEffect 범위 바깥에 선언
    const router = useRouter();
    const onCLickToMove = (id: number) => {
        router.push(`/rooms/${id}`)
    }
    useEffect(() => {
        const initMap = () => {
            if (typeof window !== 'undefined' && window.naver) {
                const mapOptions = {
                    //center: new window.naver.maps.LatLng(addresses[0].latitude, addresses[0].longitude),
                    center: new window.naver.maps.LatLng('38.00', '37.99'),
                    zoom: 16,
                };

                // 'map' 변수를 전역에서 접근 가능하도록 선언
                map = new window.naver.maps.Map('map', mapOptions);

                // 마커와 정보창 배열을 선언
                let markerList: naver.maps.Marker[] = [];
                let infoWindows: naver.maps.InfoWindow[] = [];

                addresses.forEach((address: AddressModel, index: number) => {
                    const marker = new window.naver.maps.Marker({
                        position: new window.naver.maps.LatLng(address.latitude, address.longitude),
                        map: map,
                    });

                    const infoWindow = new window.naver.maps.InfoWindow({
                        content: `<div style="width:250px;text-align:center;padding:10px;">
                                  <b><Link href="/rooms/${address.id}">${address.detailAddress}</Link></b><br/>
                                  ${address.address}
                                  <buttom type="button" onClick={onCLickToMove(${address.id})}>이동하기</button>
                                  </div>`,
                    });

                    markerList.push(marker);
                    infoWindows.push(infoWindow);

                    window.naver.maps.Event.addListener(marker, 'click', () => {
                        infoWindows.forEach((infowindow, idx) => {
                            if (idx === index) {
                                infowindow.open(map, marker);
                            } else {
                                infowindow.close();
                            }
                        });
                    });
                });

                // 'idle' 이벤트에서 마커 업데이트
                window.naver.maps.Event.addListener(map, 'idle', () => {
                    updateMarkers(map, markerList);
                });
            }
        };

        // 마커 업데이트 함수
        function updateMarkers(map: naver.maps.Map, markers: naver.maps.Marker[]) {
            const mapBounds = map.getBounds();

            markers.forEach((marker) => {
                const position = marker.getPosition();
                if (mapBounds.hasLatLng(position)) {
                    showMarker(marker);
                } else {
                    hideMarker(marker);
                }
            });
        }

        // 마커를 보이게 하는 함수
        function showMarker(marker: naver.maps.Marker) {
            if (marker.getMap()) return;
            marker.setMap(map);
        }

        // 마커를 숨기는 함수
        function hideMarker(marker: naver.maps.Marker) {
            if (!marker.getMap()) return;
            marker.setMap(null);
        }

        // 네이버 지도 스크립트가 로드된 후 지도 초기화
        if (!window.naver) {
            const script = document.createElement('script');
            script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2zx8z3y9qn&submodules=geocoder`;
            script.async = true;
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }, [addresses]);

    return <div id="map" style={{ width: '500px', height: '740px' }} />;
};

export default NaverMap;
