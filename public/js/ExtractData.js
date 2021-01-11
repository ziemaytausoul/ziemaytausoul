const module_template = `<div style="height: 100vh;">
<div id="first_sec_top" class="row-3" style="position:relative;">
    <!--first row-4-->
    <div id="snake" class="col-3 snake">
        <!--first row-4, first column-->
        <div class="col-beside">
            <!--first column-->
            <div class="row-4">
                <div id="6_special" class="col-6"> 
                </div>
                <div class="col-6">
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4">
                <div class="col-12">
                    <div id="6_first_tier" class="row-6 content">

                    </div>
                    <div id="6_second_tier" class="row-6 content">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-mid">
            <!--second column-->
            <div id="6_main" class="main_content"></div>

            <div class="row-4">
                <div class="col-12">
                    <div class="row-4"></div>
                    <div id="6_ten_years" class="row-4 ten_years">

                    </div>
                    <div id="6_cheong_sun" class="row-4 cheong_sun">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-beside">
            <!--third column-->
            <div class="row-4 ">
                <div class="col-6">
                    <div id="6_m_moon" class="row-12 content">
                        
                    </div>
                </div>
                <div class="col-6">
                    <div id="6_moon" class="row-12 content">

                    </div>
                </div>
            </div>
            <div class="row-4">

            </div>
            <div class="row-4 content">
                <div class="col-12">
                    <div class="row-5">

                    </div>
                    <div class="row-7">
                        <div id="6_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                        </div>
                        <div id="6_position" class="position">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="horse" class="col-3 horse">
        <!--first row-4, second column-->
        <div class="col-beside">
            <!--first column-->
            <div class="row-4">
                <div id="7_special" class="col-6">
                </div>
                <div class="col-6">
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4">
                <div class="col-12">
                    <div id="7_first_tier" class="row-6 content">

                    </div>
                    <div id="7_second_tier" class="row-6 content">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-mid">
            <!--second column-->
            <div id="7_main" class="main_content"></div>
            <div class="row-4">
                <div class="col-12">
                    <div class="row-4"></div>
                    <div id="7_ten_years" class="row-4 ten_years">

                    </div>
                    <div id="7_cheong_sun" class="row-4 cheong_sun">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-beside">
            <!--third column-->
            <div class="row-4">
                <div class="col-6">
                    <div id="7_m_moon" class="row-12 content">
                        
                    </div>
                </div>
                <div class="col-6">
                    <div id="7_moon" class="row-12 content">

                    </div>
                </div>
            </div>
            <div class="row-4">

            </div>
            <div class="row-4 content">
                <div class="col-12">
                    <div class="row-5">

                    </div>
                    <div class="row-7">
                        <div id="7_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                        </div>
                        <div id="7_position" class="position">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="goat" class="col-3 goat">
        <!--first row-4, third column-->
        <div class="col-beside">
            <!--first column-->
            <div class="row-4">
                <div id="8_special" class="col-6">
                </div>
                <div class="col-6">
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4">
                <div class="col-12">
                    <div id="8_first_tier" class="row-6 content">

                    </div>
                    <div id="8_second_tier" class="row-6 content">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-mid">
            <!--second column-->
            <div id="8_main" class="main_content"></div>
            <div class="row-4">
                <div class="col-12">
                    <div class="row-4"></div>
                    <div id="8_ten_years" class="row-4 ten_years">

                    </div>
                    <div id="8_cheong_sun" class="row-4 cheong_sun">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-beside">
            <!--third column-->
            <div class="row-4 ">
                <div class="col-6">
                    <div id="8_m_moon" class="row-12 content">
                        
                    </div>
                </div>
                <div class="col-6">
                    <div id="8_moon" class="row-12 content">

                    </div>
                </div>
            </div>
            <div class="row-4">

            </div>
            <div class="row-4 content">
                <div class="col-12">
                    <div class="row-5">

                    </div>
                    <div class="row-7">
                        <div id="8_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                        </div>
                        <div id="8_position" class="position">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="monkey" class="col-3 monkey">
        <!--first row-4, forth column-->
        <div class="col-beside">
            <!--first column-->
            <div class="row-4">
                <div id="9_special" class="col-6">
                </div>
                <div class="col-6">
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4">
                <div class="col-12">
                    <div id="9_first_tier" class="row-6 content">

                    </div>
                    <div id="9_second_tier" class="row-6 content">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-mid">
            <!--second column-->
            <div id="9_main" class="main_content"></div>
            <div class="row-4">
                <div class="col-12">
                    <div class="row-4"></div>
                    <div id="9_ten_years" class="row-4 ten_years">

                    </div>
                    <div id="9_cheong_sun" class="row-4 cheong_sun">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-beside">
            <!--third column-->
            <div class="row-4">
                <div class="col-6">
                    <div id="9_m_moon" class="row-12 content">
                        
                    </div>
                </div>
                <div class="col-6">
                    <div id="9_moon" class="row-12 content">

                    </div>
                </div>
            </div>
            <div class="row-4">

            </div>
            <div class="row-4 content">
                <div class="col-12">
                    <div class="row-5">

                    </div>
                    <div class="row-7">
                        <div id="9_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                        </div>
                        <div id="9_position" class="position">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="middle" class="row-6">
    <!--second row-4-->
    <div class="col-3">
        <div class="row-6">
            <div id="dragon" class="col-12 dragon">
                <div class="col-beside">
                    <!--first column-->
                    <div class="row-4">
                        <div id="5_special" class="col-6">
                        </div>
                        <div class="col-6">
                        </div>
                    </div>
                    <div class="row-4">
                    </div>
                    <div class="row-4">
                        <div class="col-12">
                            <div id="5_first_tier" class="row-6 content">

                            </div>
                            <div id="5_second_tier" class="row-6 content">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-mid">
                    <!--second column-->
                    <div id="5_main" class="main_content"></div>
                    <div class="row-4">
                        <div class="col-12">
                            <div class="row-4"></div>
                            <div id="5_ten_years" class="row-4 ten_years">

                            </div>
                            <div id="5_cheong_sun" class="row-4 cheong_sun">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-beside">
                    <!--third column-->
                    <div class="row-4">
                        <div class="col-6">
                            <div id="5_m_moon" class="row-12 content">

                            </div>
                        </div>
                        <div class="col-6">
                            <div id="5_moon" class="row-12 content">

                            </div>
                        </div>
                    </div>
                    <div class="row-4">

                    </div>
                    <div class="row-4 content">
                        <div class="col-12">
                            <div class="row-5">

                            </div>
                            <div class="row-7">
                                <div id="5_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                                </div>
                                <div id="5_position" class="position">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-6">
            <div id="rabbit" class="col-12 rabbit">
                <div class="col-beside">
                    <!--first column-->
                    <div class="row-4">
                        <div id="4_special" class="col-6">
                        </div>
                        <div class="col-6">
                        </div>
                    </div>
                    <div class="row-4">
                    </div>
                    <div class="row-4">
                        <div class="col-12">
                            <div id="4_first_tier" class="row-6 content">

                            </div>
                            <div id="4_second_tier" class="row-6 content">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-mid">
                    <!--second column-->
                    <div id="4_main" class="main_content"></div>
                    <div class="row-4">
                        <div class="col-12">
                            <div class="row-4"></div>
                            <div id="4_ten_years" class="row-4 ten_years">

                            </div>
                            <div id="4_cheong_sun" class="row-4 cheong_sun">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-beside">
                    <!--third column-->
                    <div class="row-4">
                        <div class="col-6">
                            <div id="4_m_moon" class="row-12 content">
                        
                            </div>
                        </div>
                        <div class="col-6">
                            <div id="4_moon" class="row-12 content">

                            </div>
                        </div>
                    </div>
                    <div class="row-4">

                    </div>
                    <div class="row-4 content">
                        <div class="col-12">
                            <div class="row-5">

                            </div>
                            <div class="row-7">
                                <div id="4_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                                </div>
                                <div id="4_position" class="position">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6 center_vec_border">
        <div class="row-2">
            <div class="col-12"></div>
        </div>
        <div id="510" class="row-10">
            <div class="col-2">
                <div class="source center_vector">紫微斗數<span id="510_module_type"></span></div>
            </div>
            <div class="col-6">
                <div class="row-12">
                    <form id="movingstars_form" style="display:none;">
                        <div class="form-group">
                            <label for="moving_day"><strong>日:</strong></label>
                            <input id="moving_day" type="text" style="display:none" required/>
                        </div> 
                        <div class="form-group">
                            <label for="moving_month"><strong>月:</strong></label>
                            <input id="moving_month" type="text" style="display:none" required/>
                        </div>
                        <div class="form-group">
                            <label for="moving_year"><strong>年:</strong></label>
                            <input id="moving_year" type="text" style="display:none" required/>
                        </div>
                        <div class="form-group">
                            <select id="movingstars_period">
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="button" value="佈星"/>
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-4 center_vec_other">
                <div class="row-10">
                    <div class="col-2"></div>
                    <div class="col-1">
                        <div id="ten_years_positioning" class="center_vector">現行&nbsp;
                            <span id="510_span_ten_years_positioning"> </span>&nbsp;大限
                        </div>
                    </div>
                    <div class="col-1">
                        <div id="year_data" class="center_vector">
                            <span id="510_span_year_data"></span>年
                            <span id="510_span_age"></span>歲
                        </div>
                    </div>
                    <div class="col-1">
                        <div id="510_anatomy_core" class="center_vector">身主&nbsp;
                            <span id="510_span_anatomy_core"></span>
                        </div>
                    </div>
                    <div class="col-1">
                        <div id="510_module_core" class="center_vector">命主&nbsp;
                        <span id="510_span_module_core"></span>
                        </div>
                    </div>
                    <div class="col-1">
                        <div id="module_level" class="center_vector">
                        <span id="510_span_module_level"></span>局
                        </div>
                    </div>
                    <div class="col-2">
                        <div id="birth_data" class="center_vector">
                            <span id="510_span_normal_year" style="writing-mode: horizontal-tb;"></span>年
                            <span id="510_span_lunar_year"></span>年
                            <span id="510_span_lunar_month"></span>月
                            <span id="510_span_lunar_day"></span>日
                            <span id="510_span_lunar_time"></span>時
                        </div>
                    </div>
                    <div class="col-1">
                        <div id="510_people_type" class="center_vector"></div>
                    </div>
                </div>
                <div class="row-2">
                    <div class="col-12">
                    <button id="copyStar" class="btn btn-success" type="button" onclick="CopyStars(this.id)">借星</button>
                    <button id="MovingStarsTenYears" class="btn btn-success" type="button" onclick="ClearMovingStars(this.id.replace('_MovingStarsTenYears',''), 'tenYear')">清除大運星曜</button>
                    <button id="MovingStarsYear" class="btn btn-success" type="button" onclick="MovingStarFormAppear(this,'year')">流年星曜</button>
                    <button id="MovingStarsMonth" class="btn btn-success" type="button" onclick="MovingStarFormAppear(this,'month')">流月星曜</button>
                    <button id="MovingStarsDay" class="btn btn-success" type="button" onclick="MovingStarFormAppear(this,'day')">流日星曜</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-3">
        <div class="row-6">
            <div id="rooster" class="col-12 rooster">
                <div class="col-beside">
                    <!--first column-->
                    <div class="row-4">
                        <div id="10_special" class="col-6">
                        </div>
                        <div class="col-6">
                        </div>
                    </div>
                    <div class="row-4">
                    </div>
                    <div class="row-4">
                        <div class="col-12">
                            <div id="10_first_tier" class="row-6 content">

                            </div>
                            <div id="10_second_tier" class="row-6 content">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-mid">
                    <!--second column-->
                    <div id="10_main" class="main_content"></div>
                    <div class="row-4">
                        <div class="col-12">
                            <div class="row-4"></div>
                            <div id="10_ten_years" class="row-4 ten_years">

                            </div>
                            <div id="10_cheong_sun" class="row-4 cheong_sun">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-beside">
                    <!--third column-->
                    <div class="row-4 ">
                        <div class="col-6">
                            <div id="10_m_moon" class="row-12 content">
                        
                            </div>
                        </div>
                        <div class="col-6">
                            <div id="10_moon" class="row-12 content">

                            </div>
                        </div>
                    </div>
                    <div class="row-4">

                    </div>
                    <div class="row-4 content">
                        <div class="col-12">
                            <div class="row-5">

                            </div>
                            <div class="row-7">
                                <div id="10_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                                </div>
                                <div id="10_position" class="position">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-6">
            <div id="dog" class="col-12 dog">
                <div class="col-beside">
                    <!--first column-->
                    <div class="row-4">
                        <div id="11_special" class="col-6">
                        </div>
                        <div class="col-6">
                        </div>
                    </div>
                    <div class="row-4">
                    </div>
                    <div class="row-4">
                        <div class="col-12">
                            <div id="11_first_tier" class="row-6 content">

                            </div>
                            <div id="11_second_tier" class="row-6 content">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-mid">
                    <!--second column-->
                    <div id="11_main" class="main_content"></div>
                    <div class="row-4">
                        <div class="col-12">
                            <div class="row-4"></div>
                            <div id="11_ten_years" class="row-4 ten_years">

                            </div>
                            <div id="11_cheong_sun" class="row-4 cheong_sun">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-beside">
                    <!--third column-->
                    <div class="row-4">
                        <div class="col-6">
                            <div id="11_m_moon" class="row-12 content">
                        
                            </div>
                        </div>
                        <div class="col-6">
                            <div id="11_moon" class="row-12 content">

                            </div>
                        </div>
                    </div>
                    <div class="row-4">

                    </div>
                    <div class="row-4 content">
                        <div class="col-12">
                            <div class="row-5">

                            </div>
                            <div class="row-7">
                                <div id="11_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                                </div>
                                <div id="11_position" class="position">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="bottom" class="row-3">
    <!--third row-4-->
    <div id="tiger" class="col-3 tiger">
        <div class="col-beside">
            <!--first column-->
            <div class="row-4">
                <div id="3_special" class="col-6">
                </div>
                <div class="col-6">
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4">
                <div class="col-12">
                    <div id="3_first_tier" class="row-6 content">

                    </div>
                    <div id="3_second_tier" class="row-6 content">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-mid">
            <!--second column-->
            <div id="3_main" class="main_content"></div>
            <div class="row-4">
                <div class="col-12">
                    <div class="row-4"></div>
                    <div id="3_ten_years" class="row-4 ten_years">

                    </div>
                    <div id="3_cheong_sun" class="row-4 cheong_sun">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-beside">
            <!--third column-->
            <div class="row-4 ">
                <div class="col-6">
                    <div id="3_m_moon" class="row-12 content">
                        
                    </div>
                </div>
                <div class="col-6">
                <div id="3_moon" class="row-12 content">

                </div>
            </div>
            </div>
            <div class="row-4">

            </div>
            <div class="row-4 content">
                <div class="col-12">
                    <div class="row-5">

                    </div>
                    <div class="row-7">
                        <div id="3_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                        </div>
                        <div id="3_position" class="position">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="ox" class="col-3 ox">
        <div class="col-beside">
            <!--first column-->
            <div class="row-4">
                <div id="2_special" class="col-6">
                </div>
                <div class="col-6">
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4">
                <div class="col-12">
                    <div id="2_first_tier" class="row-6 content">

                    </div>
                    <div id="2_second_tier" class="row-6 content">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-mid">
            <!--second column-->
            <div id="2_main" class="main_content"></div>
            <div class="row-4">
                <div class="col-12">
                    <div class="row-4"></div>
                    <div id="2_ten_years" class="row-4 ten_years">

                    </div>
                    <div id="2_cheong_sun" class="row-4 cheong_sun">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-beside">
            <!--third column-->
            <div class="row-4 ">
                <div class="col-6">
                    <div id="2_m_moon" class="row-12 content">
                        
                    </div>
                </div>
                <div class="col-6">
                    <div id="2_moon" class="row-12 content">

                    </div>
                </div>
            </div>
            <div class="row-4">

            </div>
            <div class="row-4 content">
                <div class="col-12">
                    <div class="row-5">

                    </div>
                    <div class="row-7">
                        <div id="2_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                        </div>
                        <div id="2_position" class="position">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="rat" class="col-3 rat">
        <div class="col-beside">
            <!--first column-->
            <div class="row-4">
                <div id="1_special" class="col-6">
                </div>
                <div class="col-6">
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4">
                <div class="col-12">
                    <div id="1_first_tier" class="row-6 content">

                    </div>
                    <div id="1_second_tier" class="row-6 content">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-mid">
            <!--second column-->
            <div id="1_main" class="main_content"></div>
            <div class="row-4">
                <div class="col-12">
                    <div class="row-4"></div>
                    <div id="1_ten_years" class="row-4 ten_years">

                    </div>
                    <div id="1_cheong_sun" class="row-4 cheong_sun">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-beside">
            <!--third column-->
            <div class="row-4 ">
                <div class="col-6">
                    <div id="1_m_moon" class="row-12 content">
                        
                    </div>
                </div>
                <div class="col-6">
                    <div id="1_moon" class="row-12 content">

                    </div>
                </div>
            </div>
            <div class="row-4">

            </div>
            <div class="row-4 content">
                <div class="col-12">
                    <div class="row-5">

                    </div>
                    <div class="row-7">
                        <div id="1_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                        </div>
                        <div id="1_position" class="position">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="pig" class="col-3 pig">
        <div class="col-beside">
            <!--first column-->
            <div class="row-4">
                <div id="12_special" class="col-6">
                </div>
                <div class="col-6">
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4">
                <div class="col-12">
                    <div id="12_first_tier" class="row-6 content">

                    </div>
                    <div id="12_second_tier" class="row-6 content">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-mid">
            <!--second column-->
            <div id="12_main" class="main_content"></div>
            <div class="row-4">
                <div class="col-12">
                    <div class="row-4"></div>
                    <div id="12_ten_years" class="row-4 ten_years">

                    </div>
                    <div id="12_cheong_sun" class="row-4 cheong_sun">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-beside">
            <!--third column-->
            <div class="row-4 ">
                <div class="col-6">
                    <div id="12_m_moon" class="row-12 content">
                        
                    </div>
                </div>
                <div class="col-6">
                    <div id="12_moon" class="row-12 content">

                    </div>
                </div>
            </div>
            <div class="row-4">
            </div>
            <div class="row-4 content">
                <div class="col-12">
                    <div class="row-5">

                    </div>
                    <div class="row-7">
                        <div id="12_character" class="character" onclick="MovingStarsTenYear(this.id, this.innerHTML)">

                        </div>
                        <div id="12_position" class="position">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`;

const template = {
    "main": {
        "front_begin": "<div class=\"main\" style=\"display:inline-block;\"",
        "front_end": ">",
        "end": "</div>"
    },
    "moon": {
        "front_begin": "<div class=\"moon\"",
        "front_end": ">",
        "end": "</div>"
    },
    "first_tier": {
        "front_begin": "<div class=\"first_tier\"s",
        "front_end": ">",
        "end": "</div>"
    },
    "second_tier": {
        "front_begin": "<div class=\"second_tier\"",
        "front_end": ">",
        "end": "</div>"
    },
    "changes": {
        "front_begin": "<span id=\"\"",
        "front_end": ">",
        "end": "</span>"
    },
    "character": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "position": {
        "front_begin": "<div",
        "front_end": ">",
        "end": "</div>"
    },
    "ten_years": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "cheong_sun": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "module_type": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_ten_years_positioning": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_year_data": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_age": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_anatomy_core": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_module_core": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_module_level": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_normal_year": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_lunar_year": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_lunar_month": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_lunar_day": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "span_lunar_time": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "people_type": {
        "front_begin": "",
        "front_end": "",
        "end": ""
    },
    "special": {
        "front_begin": "<div class=\"special\"",
        "front_end": ">",
        "end": "</div>"
    },
    "m_moon": {
        "front_begin": "<div class=\"m_moon\"",
        "front_end": ">",
        "end": "</div>"
    }
};

function EmbedTemplate(sectionName) {
    $(`#${sectionName}`).html(module_template);
    $(`#${sectionName}`).find("*").filter(function () {
        var tag_id = $(this).attr("id");
        if ($(this).attr("id") != undefined) {
            $(this).attr("id", `${sectionName}_${tag_id}`);
        }
    });
}

function getTemplate() {
    return template;
}