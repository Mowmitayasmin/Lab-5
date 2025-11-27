import "reflect-metadata";
import { Request, Response } from "express";
import * as RoleService from "../services/roleService";
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { roleSchema } from "../validations/roleValidation";
import { validateRequest } from "../middleware/validate";

@Controller()
export class RoleController {
  @Get("/roles")
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('sdfas')
      const roles = await RoleService.fetchAllRoles();
      return res.status(200).json(roles);
    } catch (error) {
      throw error;
    }
  }

  @Post("/role/create")
  @UseBefore(validateRequest(roleSchema))
  async createRole(@Req() req: Request, @Res() res: Response) {
    try {
      const newRole = await RoleService.createRole(req.body);
      res.status(201);
      return res.status(200).json(newRole);
    } catch (error) {
      throw error;
    }
  }

  @Put("/role/update/:id")
  @UseBefore(validateRequest(roleSchema))
  async updateRole(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const updatedRole = await RoleService.updateRole(id, req.body);
      res.status(201).json({ updatedRole });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/role/delete/:id")
  async deleteRole(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      await RoleService.deleteRole(id);
      res.status(200).json({ msg: "Role deleted succesfully" });
    } catch (error) {
      throw error;
    }
  }
}
