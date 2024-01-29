package com.pos.main.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final UserDetailsService jwtUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(jwtUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        // We don't need CSRF for this example
        httpSecurity.cors().and().csrf().disable()
                // dont authenticate this particular request
                .authorizeRequests().
                antMatchers(HttpMethod.POST, "/user/login").permitAll().
//                antMatchers("/**").permitAll().
                antMatchers("/swagger-ui.html").permitAll().
                antMatchers("/v2/api-docs").permitAll().
                antMatchers("/swagger-ui.html").permitAll().
                antMatchers("/swagger-ui-custom.html").permitAll().
                antMatchers(HttpMethod.GET, "/test/asyncTest").permitAll().
                antMatchers("/swagger-ui/**",
                        "/v2/api-docs/**", "/v3/api-docs/**",
                        "/configuration/ui",
                        "/swagger-resources/**",
                        "/configuration/security",
                        "/swagger-ui.html",
                        "/webjars/**").permitAll()

                .antMatchers(HttpMethod.GET, "/category/getAll").hasAnyRole("ADMIN", "CASHIER")
                .antMatchers(HttpMethod.POST,"/category/save").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.PUT,"/category/update").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/category/delete/{id}").hasAnyRole("ADMIN")

                .antMatchers(HttpMethod.GET,"/product/getAll").hasAnyRole("ADMIN","CASHIER")
                .antMatchers(HttpMethod.GET,"/product/getById/{id}").hasAnyRole("ADMIN","CASHIER")
                .antMatchers(HttpMethod.POST,"/product/save").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.PUT,"/product/update").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/product/delete/{id}").hasAnyRole("ADMIN")

                .antMatchers(HttpMethod.DELETE,"/invoice/delete/{id}").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.GET,"/invoice/getAll").hasAnyRole("ADMIN","CASHIER")
                .antMatchers(HttpMethod.POST,"/invoice/save").hasAnyRole("ADMIN","CASHIER")
                // all other requests need to be authenticated
                .anyRequest().authenticated().and()
                // make sure we use stateless session; session won't be used to
                // store user's state.
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        ;
        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
