import { Box, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DefaultPage = () => {

    const TABLE_COLUMN = [
        {
            text: '동영상',
            id: "video"
        },
        {
            text: '날짜',
            id: "date"
        },
        {
            text: '조회수',
            id: "views"
        },
        {    
            text: '댓글',
            id: "comments"
        }
    ];

    const [ items, setItems ] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // axios 리스트 받아오기
    const axiosUploadList = async () => {
        // console.log(userInfo);
        const { data } = await axios.post('/api/file/get-posts', { email: userInfo.email }, {});
        console.log(data);
        setItems(data);
    };

    useEffect(() => {
        if(userInfo) axiosUploadList();
    }, []);


    return <Box>
        <Box padding="1rem">
            선택지 + 버튼 + 이것저것?
            <Button>게시글 추가</Button>
        </Box>
        <Box bgcolor="#111111" color="#ffffff" fontSize="0.9rem" display={ true ? "block" :"none" }
            paddingTop="1.2rem" paddingBottom="1.2rem" paddingLeft="1.7rem" paddingRight="1.7rem">
            여기가 툴바 (평소엔 숨겨짐)
        </Box>
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableCell padding="checkbox">
                        <Checkbox />
                    </TableCell>
                    { 
                        TABLE_COLUMN.map(({ text, id }) => 
                            <TableCell key={`table_head-${id}`} style={{ fontSize: "0.85rem", color: "gray", padding: "0.6rem" }}>
                                { text }
                            </TableCell>
                        )
                    }
                </TableHead>
                <TableBody>
                    {
                        items.map( item => {
                            return <TableRow key={`table_body-${item.key}`}>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                {
                                    TABLE_COLUMN.map(({ id }) => {
                                        return <TableCell key={`table_cell-${item.key}-${id}`}>
                                            { item[id] }
                                        </TableCell>
                                    })
                                }
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
};

export default DefaultPage;