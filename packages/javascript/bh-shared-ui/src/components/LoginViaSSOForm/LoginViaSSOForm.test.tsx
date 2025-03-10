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

import userEvent from '@testing-library/user-event';
import { OIDCProviderInfo, SAMLProviderInfo, SSOProvider, SSOProviderConfiguration } from 'js-client-library';
import { act, render, screen } from '../../test-utils';
import LoginViaSSOForm from './LoginViaSSOForm';

const testSSOProviders: SSOProvider[] = [
    {
        name: 'sso-provider-1',
        slug: 'test-slug-1',
        type: 'OIDC',
        login_uri: '',
        callback_uri: '',
        id: 1,
        created_at: '',
        updated_at: '',
        details: {} as OIDCProviderInfo,
        config: {} as SSOProviderConfiguration['config'],
    },
    {
        name: 'sso-provider-2',
        slug: 'test-slug-2',
        type: 'SAML',
        login_uri: '',
        callback_uri: '',
        id: 2,
        created_at: '',
        updated_at: '',
        details: {} as SAMLProviderInfo,
        config: {} as SSOProviderConfiguration['config'],
    },
];

describe('LoginViaSSOForm', () => {
    it('should render', async () => {
        const testOnSubmit = vi.fn();
        const testOnCancel = vi.fn();
        await act(async () => {
            render(<LoginViaSSOForm providers={testSSOProviders} onSubmit={testOnSubmit} onCancel={testOnCancel} />);
        });

        expect(screen.getByLabelText(/choose your sso provider/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /continue$/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('should render list of available SSO providers', async () => {
        const user = userEvent.setup();
        const testOnSubmit = vi.fn();
        const testOnCancel = vi.fn();

        render(<LoginViaSSOForm providers={testSSOProviders} onSubmit={testOnSubmit} onCancel={testOnCancel} />);

        await user.click(screen.getByLabelText(/choose your sso provider/i));
        expect(await screen.findAllByRole('option')).toHaveLength(2);
        for (const testSSOProvider of testSSOProviders) {
            expect(screen.getByText(testSSOProvider.name)).toBeInTheDocument();
        }
    });

    it('continue button is disabled when no SSO provider has been selected', async () => {
        const testOnSubmit = vi.fn();
        const testOnCancel = vi.fn();
        await act(async () => {
            render(<LoginViaSSOForm providers={testSSOProviders} onSubmit={testOnSubmit} onCancel={testOnCancel} />);
        });

        expect(screen.getByRole('button', { name: /continue$/i })).toBeDisabled();
    });

    it('should call onSubmit with initiation_url of selected SSO provider', async () => {
        const user = userEvent.setup();
        const testOnSubmit = vi.fn();
        const testOnCancel = vi.fn();

        render(<LoginViaSSOForm providers={testSSOProviders} onSubmit={testOnSubmit} onCancel={testOnCancel} />);

        await user.click(screen.getByLabelText(/choose your sso provider/i));
        expect(await screen.findAllByRole('option')).toHaveLength(2);
        await user.click(screen.getByText(testSSOProviders[0].name));
        expect(screen.getByRole('button', { name: /continue$/i })).not.toBeDisabled();
        await user.click(screen.getByRole('button', { name: /continue$/i }));
        expect(testOnSubmit).toHaveBeenCalledWith(testSSOProviders[0].slug);
    });

    it('should call onCancel when cancel button clicked', async () => {
        const user = userEvent.setup();
        const testOnSubmit = vi.fn();
        const testOnCancel = vi.fn();

        render(<LoginViaSSOForm providers={testSSOProviders} onSubmit={testOnSubmit} onCancel={testOnCancel} />);

        await user.click(screen.getByRole('button', { name: /cancel/i }));
        expect(testOnCancel).toHaveBeenCalled();
    });
});
