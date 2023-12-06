import { UserService } from "./user.service";
import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseInterceptors } from "@nestjs/common";
import { WorkEntry } from "./work_entry.model";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";

@Controller("/api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @Header('Cache-Control', 'no-store')
  async getAllWorkEntriesForUser(@Param("id") id: number): Promise<WorkEntry[]> {
      return this.userService.getAllWorkEntries(id);
  };

  @Get("/workEntry/:id?")
  async getWorkEntryById(@Param("id") id?: number): Promise<WorkEntry> {
      return this.userService.getWorkEntryById(id);
  };

  @HttpCode(HttpStatus.CREATED)
  @Post('/save')
  @UseInterceptors(FileInterceptor(`file`, {
    storage: diskStorage({
      destination: join(__dirname, '../uploads/myFiles'),
      filename: (req, file, cb) => {
        const filename: string = file.originalname;
        const destinationPath = `${filename}`;
        cb(null, destinationPath);
      }
    })
  }))
  async createWorkEntry(@Req()formData, @Res() res): Promise<void> {
    try {
      const data: WorkEntry = { ...formData.body };
      const file = formData.file;

      if (file) {
        const filename: string = formData.file.originalname;
        data.imageUrl = `${filename}`;
      }

      await this.userService.createWorkEntry(data);

      res.status(200).json({ message: 'Work Entry Created Successfully' });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  @Delete(":id")
  async deleteWorkEntry(@Param("id") id: number): Promise<WorkEntry> {
      return this.userService.deleteWorkEntry(id);
  };

  @Put(":id")
  async updateWorkEntry(@Body() data: WorkEntry, @Param("id") id: number): Promise<WorkEntry> {
    return this.userService.updateWorkEntry(id, data);
  };
}