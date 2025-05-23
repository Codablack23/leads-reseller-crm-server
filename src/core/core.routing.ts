import affiliateRouter from '@app/affiliate/affiliate.router'
import apiRouter from '@app/api/api.router'
import apiKeyRouter from '@app/apiKeys/apiKey.router'
import authRouter from '@app/auth/auth.router'
import brandRouter from '@app/brand/brand.router'
import leadRouter from '@app/leads/lead.router'
import statusRouter from '@app/status/status.router'
import {Router} from 'express'


const appRouter = Router()
appRouter.use(authRouter.routeGroup,authRouter.routeHandler)
appRouter.use(affiliateRouter.routeGroup,affiliateRouter.routeHandler)
appRouter.use(brandRouter.routeGroup,brandRouter.routeHandler)
appRouter.use(apiRouter.routeGroup,apiRouter.routeHandler)
appRouter.use(apiKeyRouter.routeGroup,apiKeyRouter.routeHandler)
appRouter.use(leadRouter.routeGroup,leadRouter.routeHandler)
appRouter.use(leadRouter.routeGroup,leadRouter.routeHandler)
appRouter.use(statusRouter.routeGroup,statusRouter.routeHandler)


export default appRouter

