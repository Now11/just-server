import { Router, Request } from "express"
import { run } from "../../common/utils/routeHelper"
import { createNewUser, getUserById } from "../../services/userService"

const router = Router()
router
  .get(
    "/:id",
    run((req: Request) => getUserById(req.params.id))
  )
  .post(
    "/",
    run((req: Request) => createNewUser(req.body))
  )
export default router
