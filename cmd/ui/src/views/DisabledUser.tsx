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

import { Button } from '@bloodhoundenterprise/doodleui';
import { Alert, AlertTitle } from '@mui/material';
import { useAppNavigate } from 'bh-shared-ui';
import React from 'react';
import LoginPage from 'src/components/LoginPage';
import { logout } from 'src/ducks/auth/authSlice';
import { ROUTE_LOGIN } from 'src/routes/constants';
import { useAppDispatch } from 'src/store';

const DisabledUser: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useAppNavigate();
    return (
        <LoginPage>
            <div className='flex flex-col gap-8'>
                <Alert severity='warning'>
                    <AlertTitle>Your Account Has Been Disabled</AlertTitle>
                    Please contact your system administrator for assistance.
                </Alert>

                <Button
                    onClick={() => {
                        dispatch(logout());
                        navigate(ROUTE_LOGIN, { discardQueryParams: true });
                    }}
                    data-testid='disabled-user-back-to-login'
                    size='large'
                    type='button'
                    className='w-full'>
                    Back to Login
                </Button>
            </div>
        </LoginPage>
    );
};

export default DisabledUser;
