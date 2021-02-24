import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from "multer";

@Controller('/api/file')
export class FileController {

    constructor( private readonly fileService: FileService){}

    @Post('/upload')
    // @UseInterceptors(FileInterceptor('thumbnail', {
    //     storage: diskStorage({ // 저장소 옵션
    //         destination: (req, file, cb) => { // 저장 위치
    //             console.log('thumbnail destination', file);
    //             cb(null, "./thumbnails")
    //         },
    //         filename: ( req, file, cb ) => { // 파일명 규칙
    //             console.log('thumbnail destination', file);
    //             cb( null, `${Date.now()}-${file.originalname}` );
    //         }
    //     })
    // }))
    @UseInterceptors(FileInterceptor('video', { // 필드명, 최대한도
        storage: diskStorage({ // 저장소 옵션
            destination: (req, file, cb) => { // 저장 위치
                console.log('video destination', file);
                cb(null, "./videos")
            },
            filename: ( req, file, cb ) => { // 파일명 규칙
                console.log('video destination', file);
                cb( null, `${Date.now()}-${file.originalname}` );
            }
        })
    })) // 파일 업로드 옵션
    // @UseInterceptors(FileFieldsInterceptor)
    async a (@UploadedFile() file, @Body() body) {
        const { title, description, image } = body;
        console.log(file, image);
        return await this.fileService.a( title, description, file.filename );
    }

}
