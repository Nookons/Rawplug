import React from 'react'
import {useState} from "react";

export const MyPagination = async ({data, page}) => {
    const total = data.length
    let itemPerPage = 2
    let firstItem = (page * 1) - 1 // 6
    let lastItem = (page * itemPerPage) - 1// 9

    const arr = []

    data.map((e, index) => {
        if (index <= lastItem) {
            arr.push(e)
            console.log(index)
        }
    })
    return data
}