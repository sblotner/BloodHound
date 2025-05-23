// Copyright 2023 Specter Ops, Inc.
//
// Licensed under the Apache License, Version 2.0
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0

import { Typography } from '@mui/material';
import { FC } from 'react';

const General: FC = () => {
    return (
        <>
            <Typography variant='body2'>
                When a virtual machine is configured to allow logon with Azure AD credentials, the VM automatically has
                certain principals added to its local administrators group, including any principal granted the Virtual
                Machine Administrator Login (or "VMAL") admin role.
            </Typography>
            <Typography variant='body2'>
                Any principal granted this role, scoped to the affected VM, can connect to the VM via RDP and will be
                granted local admin rights on the VM.
            </Typography>
        </>
    );
};

export default General;
