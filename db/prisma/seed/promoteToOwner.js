"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_1 = require("../../../common/roles");
const prisma_1 = require("../../src/prisma");
prisma_1.prisma.instance_roles
    .findUniqueOrThrow({ where: { name: roles_1.InstanceRoles.owner } })
    .then((ownerRole) => {
    if (!ownerRole) {
        console.log('Owner role not found');
    }
    else {
        console.log('Promoting user to owner');
        return prisma_1.prisma.users
            .updateMany({
            data: { instance_role_id: ownerRole.id },
        })
            .then(() => console.log('Done'));
    }
});
//# sourceMappingURL=promoteToOwner.js.map