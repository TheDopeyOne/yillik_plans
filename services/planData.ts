
import { LessonPlan, PlanData, GradeOption } from '../types';

// FRESH START: v8 key ile temiz sayfa açıyoruz.
const CUSTOM_PLANS_KEY = 'plan_assistant_custom_v8';

// 1. Default Grades (Sabit Sınıflar)
export const DEFAULT_GRADES: GradeOption[] = [
    { id: '9', label: '9. Sınıf', subLabel: 'Fizik', icon: 'atom', color: 'bg-blue-500' },
    { id: '10', label: '10. Sınıf', subLabel: 'Fizik', icon: 'calculator', color: 'bg-indigo-500' },
    { id: '11', label: '11. Sınıf', subLabel: 'Fizik', icon: 'book', color: 'bg-violet-500' },
    { id: '12', label: '12. Sınıf', subLabel: 'Fizik', icon: 'atom', color: 'bg-rose-500' },
    { id: 'astro', label: '10. Sınıf', subLabel: 'Astronomi', icon: 'telescope', color: 'bg-slate-800' },
];

// 2. Default Plan Data (Sabit Veriler) - 12. SINIF DAHİL TAM LİSTE
export const DEFAULT_PLAN_DATA: PlanData = {
    '9': [
        { range: "08-12 Eylül", displayMonth: "EYLÜL", topic: "Fizik Bilimi", outcome: "FİZ.9.1.1. Fizik biliminin tanımına yönelik tümevarımsal akıl yürütebilme" },
        { range: "15-19 Eylül", displayMonth: "EYLÜL", topic: "Fizik Biliminin Alt Dalları", outcome: "FİZ.9.1.2. Fizik biliminin alt dallarını sınıflandırabilme" },
        { range: "22-26 Eylül", displayMonth: "EYLÜL", topic: "Fizik Bilimine Yön Verenler", outcome: "FİZ.9.1.3. Fizik bilimine katkıda bulunmuş bilim insanlarının deneyimlerini yansıtabilme" },
        { range: "29 Eylül-03 Ekim", displayMonth: "EKİM", topic: "Fizik Bilimi İle İlgili Kariyer Keşfi", outcome: "FİZ.9.1.4. Bilim ve teknoloji alanında faaliyet gösteren kurum veya kuruluşlarda fizik bilimi ile ilişkili kariyer olanaklarını sorgulayabilme" },
        { range: "06-10 Ekim", displayMonth: "EKİM", topic: "Temel ve Türetilmiş Nicelikler", outcome: "FİZ.9.2.1. SI birim sisteminde birimleri verilen temel ve türetilmiş nicelikleri sınıflandırabilme" },
        { range: "13-17 Ekim", displayMonth: "EKİM", topic: "Skaler ve Vektörel Nicelikler", outcome: "FİZ.9.2.2. Skaler ve vektörel nicelikleri karşılaştırabilme" },
        { range: "20-24 Ekim", displayMonth: "EKİM", topic: "Vektörler", outcome: "FİZ.9.2.3. Aynı doğrultu üzerinde yer alan farklı vektörlerin yön ve büyüklüklerine yönelik bilimsel çıkarım yapabilme" },
        { range: "27-31 Ekim", displayMonth: "EKİM", topic: "Vektörler (SINAV HAFTASI)", outcome: "FİZ.9.2.4. Vektörlerin toplanmasında kullanılan uç uca ekleme ve paralel kenar yöntemi ile bileşenlerine ayırma işlemine ilişkin tümevarımsal akıl yürütebilme" },
        { range: "03-07 Kasım", displayMonth: "KASIM", topic: "Vektörler", outcome: "FİZ.9.2.4. Vektörlerin toplanmasında kullanılan uç uca ekleme ve paralel kenar yöntemi ile bileşenlerine ayırma işlemine ilişkin tümevarımsal akıl yürütebilme" },
        { range: "10-14 Kasım", displayMonth: "KASIM", topic: "1.DÖNEM ARA TATİLİ", outcome: "1.DÖNEM ARA TATİLİ" },
        { range: "17-21 Kasım", displayMonth: "KASIM", topic: "Vektörler", outcome: "FİZ.9.2.4. Vektörlerin toplanmasında kullanılan uç uca ekleme ve paralel kenar yöntemi ile bileşenlerine ayırma işlemine ilişkin tümevarımsal akıl yürütebilme" },
        { range: "24-28 Kasım", displayMonth: "KASIM", topic: "Doğadaki Temel Kuvvetler", outcome: "FİZ.9.2.5. Doğadaki temel kuvvetleri karşılaştırabilme" },
        { range: "01-05 Aralık", displayMonth: "ARALIK", topic: "Hareket ve Hareket Türleri", outcome: "FİZ.9.2.6. Hareketin temel kavramlarının tanımlarına yönelik tümevarımsal akıl yürütebilme" },
        { range: "08-12 Aralık", displayMonth: "ARALIK", topic: "Hareket ve Hareket Türleri", outcome: "FİZ.9.2.6. Hareketin temel kavramlarının tanımlarına yönelik tümevarımsal akıl yürütebilme" },
        { range: "15-19 Aralık", displayMonth: "ARALIK", topic: "Hareket ve Hareket Türleri", outcome: "FİZ.9.2.6. Hareketin temel kavramlarının tanımlarına yönelik tümevarımsal akıl yürütebilme" },
        { range: "22-26 Aralık", displayMonth: "ARALIK", topic: "Hareket ve Hareket Türleri", outcome: "FİZ.9.2.7. Hareket türlerini sınıflandırabilme" },
        { range: "29 Aralık-02 Ocak", displayMonth: "OCAK", topic: "Hareket ve Hareket Türleri (SINAV HAFTASI)", outcome: "FİZ.9.2.7. Hareket türlerini sınıflandırabilme" },
        { range: "05-09 Ocak", displayMonth: "OCAK", topic: "Basınç", outcome: "FİZ.9.3.1. Basınca yönelik çıkarımlarda bulunabilme" },
        { range: "12-16 Ocak", displayMonth: "OCAK", topic: "OKUL TEMELLİ PLANLAMA", outcome: "OKUL TEMELLİ PLANLAMA" },
        { range: "19-23 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "26-30 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "02-06 Şubat", displayMonth: "ŞUBAT", topic: "Sıvılarda Basınç", outcome: "FİZ.9.3.2. Durgun sıvılarda basınca yönelik çıkarımlarda bulunabilme" },
        { range: "09-13 Şubat", displayMonth: "ŞUBAT", topic: "Sıvılarda Basınç", outcome: "FİZ.9.3.3. Sıvılarda basıncın kullanıldığı günlük hayat örneklerine ilişkin sorgulama yapabilme" },
        { range: "16-20 Şubat", displayMonth: "ŞUBAT", topic: "Açık Hava Basıncı", outcome: "FİZ.9.3.4. Açık hava basıncına ilişkin çıkarım yapabilme" },
        { range: "23-27 Şubat", displayMonth: "ŞUBAT", topic: "Açık Hava Basıncı", outcome: "FİZ.9.3.4. Açık hava basıncına ilişkin çıkarım yapabilme" },
        { range: "02-06 Mart", displayMonth: "MART", topic: "Kaldırma Kuvveti (SINAV HAFTASI)", outcome: "FİZ.9.3.5. Kaldırma kuvvetini etkileyen değişkenleri belirlemeye yönelik deney yapabilme" },
        { range: "09-13 Mart", displayMonth: "MART", topic: "Kaldırma Kuvveti", outcome: "FİZ.9.3.6. Kaldırma kuvveti ile sıvılardaki basınca neden olan kuvvet arasındaki ilişkiyeyönelik çıkarım yapabilme" },
        { range: "16-20 Mart", displayMonth: "MART", topic: "2.DÖNEM ARA TATİLİ", outcome: "2.DÖNEM ARA TATİLİ" },
        { range: "23-27 Mart", displayMonth: "MART", topic: "Bernoulli İlkesi", outcome: "FİZ.9.3.7. Akışkanın geçtiği borunun kesit alanı ile akışkanın sürati ve boru çeperlerine yaptığı basınç arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme" },
        { range: "30 Mart-03 Nisan", displayMonth: "NİSAN", topic: "Bernoulli İlkesi", outcome: "FİZ.9.3.7. Akışkanın geçtiği borunun kesit alanı ile akışkanın sürati ve boru çeperlerine yaptığı basınç arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme" },
        { range: "06-10 Nisan", displayMonth: "NİSAN", topic: "İç Enerji Isı ve Sıcaklık Arasındaki İlişki", outcome: "FİZ.9.4.1. İç enerjinin ısı ve sıcaklık ile arasındaki ilişki hakkında tümevarımsal akıl yürütebilme" },
        { range: "13-17 Nisan", displayMonth: "NİSAN", topic: "Isı Öz Isı Isı Sığası ve Sıcaklık Farkı Arasındaki İlişki", outcome: "FİZ.9.4.2. Isı öz ısı ısı sığası ve sıcaklık farkı arasındaki matematiksel modele ilişkin tümevarımsal akıl yürütebilme" },
        { range: "20-24 Nisan", displayMonth: "NİSAN", topic: "Isı Öz Isı Isı Sığası ve Sıcaklık Farkı Arasındaki İlişki", outcome: "FİZ.9.4.2. Isı öz ısı ısı sığası ve sıcaklık farkı arasındaki matematiksel modele ilişkin tümevarımsal akıl yürütebilme" },
        { range: "27 Nisan-01 Mayıs", displayMonth: "NİSAN", topic: "Hâl Değişimi", outcome: "FİZ.9.4.3. Hâl değiştirme sıcaklığında bulunan saf bir maddenin hâl değiştirmesi için alınan veya verilen ısı miktarının bağlı olduğu değişkenler hakkında bilimsel çıkarım yapabilme" },
        { range: "04-08 Mayıs", displayMonth: "MAYIS", topic: "Hâl Değişimi", outcome: "FİZ.9.4.3. Hâl değiştirme sıcaklığında bulunan saf bir maddenin hâl değiştirmesi için alınan veya verilen ısı miktarının bağlı olduğu değişkenler hakkında bilimsel çıkarım yapabilme" },
        { range: "11-15 Mayıs", displayMonth: "MAYIS", topic: "Isıl Denge", outcome: "FİZ.9.4.4. Isıl denge durumu hakkında bilimsel gözlem yapabilme" },
        { range: "18-22 Mayıs", displayMonth: "MAYIS", topic: "Isı Aktarım Yolları", outcome: "FİZ.9.4.5. Isı aktarım yollarını sınıflayabilme" },
        { range: "25-29 Mayıs", displayMonth: "MAYIS", topic: "Isı Aktarım Yolları", outcome: "FİZ.9.4.5. Isı aktarım yollarını sınıflayabilme" },
        { range: "01-05 Haziran", displayMonth: "HAZİRAN", topic: "Isı İletim Hızı (SINAV HAFTASI)", outcome: "FİZ.9.4.6. Günlük hayattaki deneyimlerinden yola çıkarak katı maddelerdeki ısı iletim hızını etkileyen etmenlere yönelik yansıtma yapabilme" },
        { range: "08-12 Haziran", displayMonth: "HAZİRAN", topic: "Isı İletim Hızı", outcome: "FİZ.9.4.6. Günlük hayattaki deneyimlerinden yola çıkarak katı maddelerdeki ısı iletim hızını etkileyen etmenlere yönelik yansıtma yapabilme" },
        { range: "15-19 Haziran", displayMonth: "HAZİRAN", topic: "OKUL TEMELLİ PLANLAMA", outcome: "OKUL TEMELLİ PLANLAMA" },
        { range: "22-26 Haziran", displayMonth: "HAZİRAN", topic: "SOSYAL ETKİNLİK", outcome: "SOSYAL ETKİNLİK" }
    ],
    '10': [
        { range: "08-12 Eylül", displayMonth: "EYLÜL", topic: "Sabit Hızlı Hareket", outcome: "FİZ.10.1.1. Yatay doğrultuda sabit hızlı hareket ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "15-19 Eylül", displayMonth: "EYLÜL", topic: "Sabit Hızlı Hareket", outcome: "FİZ.10.1.1. Yatay doğrultuda sabit hızlı hareket ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "22-26 Eylül", displayMonth: "EYLÜL", topic: "Bir Boyutta Sabit İvmeli Hareket", outcome: "FİZ.10.1.2. İvme ve hız değişimi arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme" },
        { range: "29 Eylül-03 Ekim", displayMonth: "EKİM", topic: "Bir Boyutta Sabit İvmeli Hareket", outcome: "FİZ.10.1.3. Yatay doğrultuda sabit ivmeyle hareket eden cisimlerin hareket grafiklerinden elde edilen matematiksel modelleri yorumlayabilme" },
        { range: "06-10 Ekim", displayMonth: "EKİM", topic: "Serbest Düşme", outcome: "FİZ.10.1.4. Serbest düşme hareketi yapan cisimlerin ivmesine yönelik tümevarımsal akıl yürütebilme" },
        { range: "13-17 Ekim", displayMonth: "EKİM", topic: "Serbest Düşme", outcome: "FİZ.10.1.5. Serbest düşme hareketi ile ilgili kanıt kullanabilme" },
        { range: "20-24 Ekim", displayMonth: "EKİM", topic: "İki Boyutta Sabit İvmeli Hareket", outcome: "FİZ.10.1.6. İki boyutta sabit ivmeli hareket ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "27-31 Ekim", displayMonth: "EKİM", topic: "İki Boyutta Sabit İvmeli Hareket (SINAV HAFTASI)", outcome: "FİZ.10.1.6. İki boyutta sabit ivmeli hareket ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "03-07 Kasım", displayMonth: "KASIM", topic: "İş Enerji ve Güç", outcome: "FİZ.10.2.1. Kuvvet-yer değiştirme grafiği kullanılarak iş ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "10-14 Kasım", displayMonth: "KASIM", topic: "1. DÖNEM ARA TATİLİ", outcome: "1. DÖNEM ARA TATİLİ" },
        { range: "17-21 Kasım", displayMonth: "KASIM", topic: "İş Enerji ve Güç", outcome: "FİZ.10.2.2. İş enerji ve güç kavramlarına ilişkin çıkarım yapabilme" },
        { range: "24-28 Kasım", displayMonth: "KASIM", topic: "Enerji Biçimleri", outcome: "FİZ.10.2.3. Enerji biçimlerini karşılaştırabilme" },
        { range: "01-05 Aralık", displayMonth: "ARALIK", topic: "Enerji Biçimleri", outcome: "FİZ.10.2.3. Enerji biçimlerini karşılaştırabilme" },
        { range: "08-12 Aralık", displayMonth: "ARALIK", topic: "Mekanik Enerji", outcome: "FİZ.10.2.4. Mekanik enerjiyi çözümleyebilme" },
        { range: "15-19 Aralık", displayMonth: "ARALIK", topic: "Mekanik Enerji", outcome: "FİZ.10.2.4. Mekanik enerjiyi çözümleyebilme" },
        { range: "22-26 Aralık", displayMonth: "ARALIK", topic: "Enerji Kaynakları", outcome: "FİZ.10.2.5. Yenilenebilen ve yenilenemeyen enerji kaynaklarını karşılaştırabilme" },
        { range: "29 Aralık-02 Ocak", displayMonth: "OCAK", topic: "Basit Elektrik Devreleri (SINAV HAFTASI)", outcome: "FİZ.10.3.1. Basit elektrik devresinde potensiyel fark elektrik akımı ve direnç kavramlarının tanımına ilişkin analojik akıl yürütebilme" },
        { range: "05-09 Ocak", displayMonth: "OCAK", topic: "Basit Elektrik Devreleri", outcome: "FİZ.10.3.1. Basit elektrik devresinde potensiyel fark elektrik akımı ve direnç kavramlarının tanımına ilişkin analojik akıl yürütebilme" },
        { range: "12-16 Ocak", displayMonth: "OCAK", topic: "OKUL TEMELLİ PLANLAMA", outcome: "OKUL TEMELLİ PLANLAMA" },
        { range: "19-23 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "26-30 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "02-06 Şubat", displayMonth: "ŞUBAT", topic: "Elektrik Akımı", outcome: "FİZ.10.3.2. Elektrik yükünün hareketi üzerinden elektrik akımı kavramını çözümleyebilme" },
        { range: "09-13 Şubat", displayMonth: "ŞUBAT", topic: "Ohm Yasası", outcome: "FİZ.10.3.3. Ohm Yasası ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "16-20 Şubat", displayMonth: "ŞUBAT", topic: "Dirençlerin Bağlanması", outcome: "FİZ.10.3.4. Dirençlerin bağlanma türüne göre eşdeğer direncin büyüklüğüne ilişkin bilimsel çıkarım yapabilme" },
        { range: "23-27 Şubat", displayMonth: "ŞUBAT", topic: "Dirençlerin Bağlanması", outcome: "FİZ.10.3.4. Dirençlerin bağlanma türüne göre eşdeğer direncin büyüklüğüne ilişkin bilimsel çıkarım yapabilme" },
        { range: "02-06 Mart", displayMonth: "MART", topic: "Üreteçlerin Bağlanması (SINAV HAFTASI)", outcome: "FİZ.10.3.5. Üreteçlerin bağlanma türüne göre devreye sağladıkları potansiyel farka ilişkin bilimsel çıkarım yapabilme" },
        { range: "09-13 Mart", displayMonth: "MART", topic: "Üreteçlerin Bağlanması", outcome: "FİZ.10.3.5. Üreteçlerin bağlanma türüne göre devreye sağladıkları potansiyel farka ilişkin bilimsel çıkarım yapabilme" },
        { range: "16-20 Mart", displayMonth: "MART", topic: "2. DÖNEM ARA TATİLİ", outcome: "2. DÖNEM ARA TATİLİ" },
        { range: "23-27 Mart", displayMonth: "MART", topic: "Elektrik Akımının Oluşturabileceği Tehlikelere Karşı Alınması Gereken Önlemler", outcome: "FİZ.10.3.6. Elektrik akımının oluşturabileceği tehlikelere karşı alınması gereken önlemlerle ilgili bilgi toplayabilme" },
        { range: "30 Mart-03 Nisan", displayMonth: "NİSAN", topic: "Elektrik Akımının Oluşturabileceği Tehlikelere Karşı Alınması Gereken Önlemler", outcome: "FİZ.10.3.6. Elektrik akımının oluşturabileceği tehlikelere karşı alınması gereken önlemlerle ilgili bilgi toplayabilme" },
        { range: "06-10 Nisan", displayMonth: "NİSAN", topic: "Topraklamanın Önemi Dalgaların Temel Kavramları", outcome: "FİZ.10.3.7. Topraklama olayının önemini sorgulayabilme" },
        { range: "13-17 Nisan", displayMonth: "NİSAN", topic: "Topraklamanın Önemi Dalgaların Temel Kavramları", outcome: "FİZ.10.4.1. Dalgaların temel kavramlarına ilişkin operasyonel tanımlama yapabilme" },
        { range: "20-24 Nisan", displayMonth: "NİSAN", topic: "Dalgaların Sınıflandırılması Dalgaların Yayılma Süratini Etkileyen Etmenler", outcome: "FİZ.10.4.2. Dalgaları özelliklerine göre sınıflandırabilme FİZ.10.4.3. Dalgaların yayılma süratini etkileyen etmenlere ilişkin bilimsel gözleme dayalı tahmin yapabilme" },
        { range: "27 Nisan-01 Mayıs", displayMonth: "NİSAN", topic: "Dalgaların Sınıflandırılması Dalgaların Yayılma Süratini Etkileyen Etmenler", outcome: "FİZ.10.4.3. Dalgaların yayılma süratini etkileyen etmenlere ilişkin bilimsel gözleme dayalı tahmin yapabilme" },
        { range: "04-08 Mayıs", displayMonth: "MAYIS", topic: "Dalgaların Yayılma Süratini Etkileyen Etmenler Periyodik Hareketler Su Dalgalarında Yansıma ve Kırılma", outcome: "FİZ.10.4.3. Dalgaların yayılma süratini etkileyen etmenlere ilişkin bilimsel gözleme dayalı tahmin yapabilme FİZ.10.4.4. Periyodik hareketlere ilişkin deneyimlerini yansıtabilme" },
        { range: "11-15 Mayıs", displayMonth: "MAYIS", topic: "Dalgaların Yayılma Süratini Etkileyen Etmenler Periyodik Hareketler Su Dalgalarında Yansıma ve Kırılma", outcome: "FİZ.10.4.5. Su dalgalarında yansıma ve kırılma ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "18-22 Mayıs", displayMonth: "MAYIS", topic: "Dalgaların Yayılma Süratini Etkiyen Etmenler Periyodik Hareketler Su Dalgalarında Yansıma ve Kırılma", outcome: "FİZ.10.4.5. Su dalgalarında yansıma ve kırılma ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "25-29 Mayıs", displayMonth: "MAYIS", topic: "Dalgaların Yayılma Süratini Etkileyen Etmenler Periyodik Hareketler Su Dalgalarında Yansıma ve Kırılma", outcome: "FİZ.10.4.5. Su dalgalarında yansıma ve kırılma ile ilgili tümevarımsal akıl yürütebilme" },
        { range: "01-05 Haziran", displayMonth: "HAZİRAN", topic: "Rezonans ve Deprem (SINAV HAFTASI)", outcome: "FİZ.10.4.6. Rezonans ve depreme ilişkin kavramlar üzerinden depremi sorgulayabilme" },
        { range: "08-12 Haziran", displayMonth: "HAZİRAN", topic: "Rezonans ve Deprem", outcome: "FİZ.10.4.7. Depremle ilgili bilimsel model oluşturabilme" },
        { range: "15-19 Haziran", displayMonth: "HAZİRAN", topic: "OKUL TEMELLİ PLANLAMA", outcome: "OKUL TEMELLİ PLANLAMA" },
        { range: "22-26 Haziran", displayMonth: "HAZİRAN", topic: "SOSYAL ETKİNLİK", outcome: "SOSYAL ETKİNLİK" }
    ],
    '11': [
        { range: "08-12 Eylül", displayMonth: "EYLÜL", topic: "11.1.1. VEKTÖRLER", outcome: "11.1.1.1. Vektörlerin özelliklerini açıklar. 11.1.1.2. İki ve üç boyutlu kartezyen koordinat sisteminde vektörleri çizer." },
        { range: "15-19 Eylül", displayMonth: "EYLÜL", topic: "11.1.1. VEKTÖRLER", outcome: "11.1.1.3. Vektörlerin bileşkelerini farklı yöntemleri kullanarak hesaplar. 11.1.1.4. Bir vektörün iki boyutlu kartezyen koordinat sisteminde bileşenlerini çizerek büyüklüklerini hesaplar." },
        { range: "22-26 Eylül", displayMonth: "EYLÜL", topic: "11.1.2. BAĞIL HAREKET", outcome: "11.1.2.1. Sabit hızlı iki cismin hareketini birbirine göre yorumlar. 11.1.2.2. Hareketli bir ortamdaki sabit hızlı cisimlerin hareketini farklı gözlem çerçevelerine göre yorumlar. 11.1.2.3. Bağıl hareket ile ilgili hesaplamalar yapar." },
        { range: "29 Eylül-03 Ekim", displayMonth: "EKİM", topic: "11.1.3. NEWTONIN HAREKET YASALARI", outcome: "11.1.3.1. Net kuvvetin yönünü belirleyerek büyüklüğünü hesaplar." },
        { range: "06-10 Ekim", displayMonth: "EKİM", topic: "11.1.3. NEWTONIN HAREKET YASALARI", outcome: "11.1.3.2. Net kuvvet etkisindeki cismin hareketi ile ilgili hesaplamalar yapar." },
        { range: "13-17 Ekim", displayMonth: "EKİM", topic: "11.1.4. BİR BOYUTTA SABİT İVMELİ HAREKET", outcome: "11.1.4.1. Bir boyutta sabit ivmeli hareketi analiz eder." },
        { range: "20-24 Ekim", displayMonth: "EKİM", topic: "11.1.4. BİR BOYUTTA SABİT İVMELİ HAREKET", outcome: "11.1.4.2. Bir boyutta sabit ivmeli hareket ile ilgili hesaplamalar yapar" },
        { range: "27-31 Ekim", displayMonth: "EKİM", topic: "SINAV HAFTASI", outcome: "SINAV HAFTASI" },
        { range: "03-07 Kasım", displayMonth: "KASIM", topic: "11.1.4. BİR BOYUTTA SABİT İVMELİ HAREKET", outcome: "11.1.4.3. Hava direncinin ihmal edildiği ortamda düşen cisimlerin hareketlerini analiz eder. 11.1.4.4. Düşen cisimlere etki eden hava direnç kuvvetinin bağlı olduğu değişkenleri analiz eder. 11.1.4.5. Limit hız kavramını açıklar." },
        { range: "10-14 Kasım", displayMonth: "KASIM", topic: "1. DÖNEM ARA TATİLİ", outcome: "1. DÖNEM ARA TATİLİ" },
        { range: "17-21 Kasım", displayMonth: "KASIM", topic: "11.1.4. BİR BOYUTTA SABİT İVMELİ HAREKET", outcome: "11.1.4.6. Düşey doğrultuda ilk hızı olan ve sabit ivmeli hareket yapan cisimlerin hareketlerini analiz eder." },
        { range: "24-28 Kasım", displayMonth: "KASIM", topic: "11.1.5. İKİ BOYUTTA HAREKET", outcome: "11.1.5.1. Atış hareketlerini yatay ve düşey boyutta analiz eder. 11.1.5.2. İki boyutta sabit ivmeli hareket ile ilgili hesaplamalar yapar." },
        { range: "01-05 Aralık", displayMonth: "ARALIK", topic: "11.1.6. ENERJİ VE HAREKET", outcome: "11.1.6.1. Yapılan iş ile enerji arasındaki ilişkiyi analiz eder." },
        { range: "08-12 Aralık", displayMonth: "ARALIK", topic: "11.1.6. ENERJİ VE HAREKET", outcome: "11.1.6.2. Cisimlerin hareketini mekanik enerjinin korunumunu kullanarak analiz eder." },
        { range: "15-19 Aralık", displayMonth: "ARALIK", topic: "11.1.6. ENERJİ VE HAREKET", outcome: "11.1.6.3. Sürtünmeli yüzeylerde enerji korunumunu ve dönüşümlerini analiz eder." },
        { range: "22-26 Aralık", displayMonth: "ARALIK", topic: "11.1.7. İTME VE ÇİZGİSEL MOMENTUM", outcome: "11.1.7.1. İtme ve çizgisel momentum kavramlarını açıklar." },
        { range: "29 Aralık-02 Ocak", displayMonth: "OCAK", topic: "SINAV HAFTASI", outcome: "SINAV HAFTASI" },
        { range: "05-09 Ocak", displayMonth: "OCAK", topic: "11.1.7. İTME VE ÇİZGİSEL MOMENTUM", outcome: "11.1.7.2. İtme ile çizgisel momentum değişimi arasında ilişki kurar." },
        { range: "12-16 Ocak", displayMonth: "OCAK", topic: "11.1.7. İTME VE ÇİZGİSEL MOMENTUM", outcome: "11.1.7.3. Çizgisel momentumun korunumunu analiz eder. 11.1.7.4. Çizgisel momentumun korunumu ile ilgili hesaplamalar yapar." },
        { range: "19-23 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "26-30 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "02-06 Şubat", displayMonth: "ŞUBAT", topic: "11.1.8. TORK", outcome: "11.1.8.1. Tork kavramını açıklar. 11.1.8.2. Torkun bağlı olduğu değişkenleri analiz eder. 11.1.8.3. Tork ile ilgili hesaplamalar yapar." },
        { range: "09-13 Şubat", displayMonth: "ŞUBAT", topic: "11.1.9. DENGE VE DENGE ŞARTLARI", outcome: "11.1.9.1. Cisimlerin denge şartlarını açıklar. 11.1.9.2. Kütle merkezi ve ağırlık merkezi kavramlarını açıklar. 11.1.9.3. Kütle merkezi ve ağırlık merkezi ile ilgili hesaplamalar yapar." },
        { range: "16-20 Şubat", displayMonth: "ŞUBAT", topic: "11.1.10. BASİT MAKİNELER", outcome: "11.1.10.1. Günlük hayatta kullanılan basit makinelerin işlevlerini açıklar. 11.1.10.2. Basit makineler ile ilgili hesaplamalar yapar. 11.1.10.3. Hayatı kolaylaştırmak amacıyla basit makinelerden oluşan güvenli bir sistem tasarlar." },
        { range: "23-27 Şubat", displayMonth: "ŞUBAT", topic: "11.2.1. ELEKTRİKSEL KUVVET VE ELEKTRİK ALAN", outcome: "11.2.1.1. Yüklü cisimler arasındaki elektriksel kuvveti etkileyen değişkenleri belirler. 11.2.1.2. Noktasal yük için elektrik alanı açıklar. 11.2.1.3. Noktasal yüklerde elektriksel kuvvet ve elektrik alanı ile ilgili hesaplamalar yapar." },
        { range: "02-06 Mart", displayMonth: "MART", topic: "SINAV HAFTASI", outcome: "SINAV HAFTASI" },
        { range: "09-13 Mart", displayMonth: "MART", topic: "11.2.2. ELEKTRİKSEL POTANSİYEL", outcome: "11.2.2.1. Noktasal yükler için elektriksel potansiyel enerji elektriksel potansiyel elektriksel potansiyel farkı ve elektriksel iş kavramlarını açıklar. 11.2.2.2. Düzgün bir elektrik alan içinde iki nokta arasındaki potansiyel farkını hesaplar. 11.2.2.3. Noktasal yükler için elektriksel potansiyel enerji elektriksel potansiyel elektriksel potansiyel farkı ve elektriksel iş ile ilgili hesaplamalar yapar." },
        { range: "16-20 Mart", displayMonth: "MART", topic: "2. DÖNEM ARA TATİLİ", outcome: "2. DÖNEM ARA TATİLİ" },
        { range: "23-27 Mart", displayMonth: "MART", topic: "11.2.3. DÜZGÜN ELEKTRİK ALAN VE SIĞA", outcome: "11.2.3.1. Yüklü iletken ve paralel levhalar arasında oluşan elektrik alanı alan çizgilerini çizerek açıklar. 11.2.3.2. Yüklü iletken ve paralel levhalar arasında oluşan elektrik alanının bağlı olduğu değişkenleri analiz eder. 11.2.3.3. Yüklü parçacıkların düzgün elektrik alanıdaki davranışını açıklar." },
        { range: "30 Mart-03 Nisan", displayMonth: "NİSAN", topic: "11.2.3. DÜZGÜN ELEKTRİK ALAN VE SIĞA", outcome: "11.2.3.4. Sığa kapasite kavramını açıklar. 11.2.3.5. Sığanın bağlı olduğu değişkenleri analiz eder. 11.2.3.6. Yüklü levhaların özelliklerinden faydalanarak sığacın kondansatör işlevini açıklar." },
        { range: "06-10 Nisan", displayMonth: "NİSAN", topic: "11.2.4. MANYETİZMA VE ELEKTROMANYETİK İNDÜKLENME", outcome: "11.2.4.1. Üzerinden akım geçen iletken düz bir telin çevresinde halkanın merkezinde ve akım makarasının bobin merkez ekseninde oluşan manyetik alanın şiddetini etkileyen değişkenleri analiz eder. 11.2.4.2. Üzerinden akım geçen iletken düz bir telin çevresinde halkanın merkezinde ve akım makarasının merkez ekseninde oluşan manyetik alan ile ilgili hesaplamalar yapar. 11.2.4.3. Üzerinden akım geçen iletken düz bir tele manyetik alanda etki eden kuvvetin yönünün ve şiddetinin bağlı olduğu değişkenleri analiz eder." },
        { range: "13-17 Nisan", displayMonth: "NİSAN", topic: "11.2.4. MANYETİZMA VE ELEKTROMANYETİK İNDÜKLENME", outcome: "11.2.4.4. Manyetik alan içerisinde akım taşıyan dikdörtgen tel çerçeveye etki eden kuvvetlerin döndürme etkisini açıklar. 11.2.4.5. Yüklü parçacıkların manyetik alan içindeki hareketini analiz eder." },
        { range: "20-24 Nisan", displayMonth: "NİSAN", topic: "11.2.4. MANYETİZMA VE ELEKTROMANYETİK İNDÜKLENME", outcome: "11.2.4.6. Manyetik akı kavramını açıklar. 11.2.4.7. İndüksiyon akımını oluşturan sebeplere ilişkin çıkarım yapar. 11.2.4.8. Manyetik akı ve indüksiyon akımı ile ilgili hesaplamalar yapar." },
        { range: "27 Nisan-01 Mayıs", displayMonth: "NİSAN", topic: "11.2.4. MANYETİZMA VE ELEKTROMANYETİK İNDÜKLENME", outcome: "11.2.4.9. Öz-indüksiyon akımının oluşum sebebini açıklar." },
        { range: "04-08 Mayıs", displayMonth: "MAYIS", topic: "11.2.4. MANYETİZMA VE ELEKTROMANYETİK İNDÜKLENME", outcome: "11.2.4.10. Yüklü parçacıkların manyetik alan ve elektrik alandaki davranışını açıklar. 11.2.4.11. Elektromotor kuvveti oluşturan sebeplere ilişkin çıkarım yapar." },
        { range: "11-15 Mayıs", displayMonth: "MAYIS", topic: "11.2.5. ALTERNATİF AKIM", outcome: "11.2.5.1. Alternatif akımı açıklar." },
        { range: "18-22 Mayıs", displayMonth: "MAYIS", topic: "11.2.5. ALTERNATİF AKIM", outcome: "11.2.5.2. Alternatif ve doğru akımı karşılaştırır." },
        { range: "25-29 Mayıs", displayMonth: "MAYIS", topic: "11.2.5. ALTERNATİF AKIM", outcome: "11.2.5.3. Alternatif ve doğru akım devrelerinde direncin bobinin ve sığacın davranışını açıklar." },
        { range: "01-05 Haziran", displayMonth: "HAZİRAN", topic: "SINAV HAFTASI", outcome: "SINAV HAFTASI" },
        { range: "08-12 Haziran", displayMonth: "HAZİRAN", topic: "11.2.5. ALTERNATİF AKIM", outcome: "11.2.5.4. İndüktans kapasitans rezonans ve empedans kavramlarını açıklar." },
        { range: "15-19 Haziran", displayMonth: "HAZİRAN", topic: "11.2.6. TRANSFORMATÖRLER", outcome: "11.2.6.1. Transformatörlerin çalışma prensibini açıklar. 11.2.6.2. Transformatörlerin kullanım amaçlarını açıklar." },
        { range: "22-26 Haziran", displayMonth: "HAZİRAN", topic: "SOSYAL ETKİNLİK", outcome: "SOSYAL ETKİNLİK" }
    ],
    '12': [
        { range: "08-12 Eylül", displayMonth: "EYLÜL", topic: "12.1.1. Düzgün Çembersel Hareket", outcome: "12.1.1.1. Düzgün çembersel hareketi açıklar. (Periyot, frekans, çizgisel hız, açısal hız)" },
        { range: "15-19 Eylül", displayMonth: "EYLÜL", topic: "12.1.1. Düzgün Çembersel Hareket", outcome: "12.1.1.2. Merkezcil kuvvetin bağlı olduğu değişkenleri analiz eder." },
        { range: "22-26 Eylül", displayMonth: "EYLÜL", topic: "12.1.1. Düzgün Çembersel Hareket", outcome: "12.1.1.3. Düzgün çembersel hareket uygulamaları (Yatay/Düşey düzlem, Virajlar)." },
        { range: "29 Eylül-03 Ekim", displayMonth: "EKİM", topic: "12.1.2. Dönerek Öteleme Hareketi", outcome: "12.1.2.1. Dönerek öteleme hareketini açıklar. 12.1.2.2. Eylemsizlik momenti kavramını açıklar." },
        { range: "06-10 Ekim", displayMonth: "EKİM", topic: "12.1.3. Açısal Momentum", outcome: "12.1.3.1. Açısal momentumun fiziksel anlamını ve çizgisel momentumla ilişkisini açıklar." },
        { range: "13-17 Ekim", displayMonth: "EKİM", topic: "12.1.3. Açısal Momentum", outcome: "12.1.3.2. Açısal momentumun korunumunu günlük hayattan örneklerle analiz eder." },
        { range: "20-24 Ekim", displayMonth: "EKİM", topic: "12.1.4. Kütle Çekim Kuvveti", outcome: "12.1.4.1. Kütle çekim kuvvetini açıklar. 12.1.4.2. Kütle çekim potansiyel enerjisini analiz eder." },
        { range: "27-31 Ekim", displayMonth: "EKİM", topic: "SINAV HAFTASI", outcome: "SINAV HAFTASI (1. Dönem 1. Sınav)" },
        { range: "03-07 Kasım", displayMonth: "KASIM", topic: "12.1.5. Kepler Yasaları", outcome: "12.1.5.1. Kepler Yasaları'nı açıklar ve matematiksel hesaplamalar yapar." },
        { range: "10-14 Kasım", displayMonth: "KASIM", topic: "1. DÖNEM ARA TATİLİ", outcome: "1. DÖNEM ARA TATİLİ" },
        { range: "17-21 Kasım", displayMonth: "KASIM", topic: "12.2.1. Basit Harmonik Hareket", outcome: "12.2.1.1. Basit harmonik hareketi açıklar. (Geri çağırıcı kuvvet, denge noktası)" },
        { range: "24-28 Kasım", displayMonth: "KASIM", topic: "12.2.1. Basit Harmonik Hareket", outcome: "12.2.1.2. Basit harmonik harekette konum, hız ve ivmenin zamana göre değişimini analiz eder." },
        { range: "01-05 Aralık", displayMonth: "ARALIK", topic: "12.2.1. Basit Harmonik Hareket", outcome: "12.2.1.3. Yay sarkacı ve basit sarkaçta periyodun bağlı olduğu değişkenleri belirler." },
        { range: "08-12 Aralık", displayMonth: "ARALIK", topic: "12.3.1. Dalga Mekaniği (Kırınım)", outcome: "12.3.1.1. Su dalgalarında kırınım olayının meydana gelme şartlarını analiz eder." },
        { range: "15-19 Aralık", displayMonth: "ARALIK", topic: "12.3.1. Dalga Mekaniği (Girişim)", outcome: "12.3.1.2. Su dalgalarında girişim olayını analiz eder." },
        { range: "22-26 Aralık", displayMonth: "ARALIK", topic: "12.3.1. Dalga Mekaniği (Çift Yarık)", outcome: "12.3.1.3. Işığın çift yarıkta girişimine etki eden değişkenleri açıklar." },
        { range: "29 Aralık-02 Ocak", displayMonth: "OCAK", topic: "SINAV HAFTASI", outcome: "SINAV HAFTASI (1. Dönem 2. Sınav)" },
        { range: "05-09 Ocak", displayMonth: "OCAK", topic: "12.3.1. Dalga Mekaniği (Tek Yarık)", outcome: "12.3.1.4. Işığın tek yarıkta kırınımına etki eden değişkenleri açıklar." },
        { range: "12-16 Ocak", displayMonth: "OCAK", topic: "12.3.2. Doppler Olayı", outcome: "12.3.2.1. Doppler olayının etkilerini ışık ve ses dalgaları için açıklar." },
        { range: "19-23 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "26-30 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "02-06 Şubat", displayMonth: "ŞUBAT", topic: "12.3.3. Elektromanyetik Dalgalar", outcome: "12.3.3.1. Elektromanyetik dalgaların genel özelliklerini açıklar ve spektrumu analiz eder." },
        { range: "09-13 Şubat", displayMonth: "ŞUBAT", topic: "12.4.1. Atom Kavramı", outcome: "12.4.1.1. Atom kavramının tarihsel gelişimini açıklar. (Bohr Atom Modeli)" },
        { range: "16-20 Şubat", displayMonth: "ŞUBAT", topic: "12.4.1. Modern Atom Teorisi", outcome: "12.4.1.2. Modern atom teorisinin önemini ve Bohr modelinden farklarını açıklar." },
        { range: "23-27 Şubat", displayMonth: "ŞUBAT", topic: "12.4.2. Büyük Patlama ve Evren", outcome: "12.4.2.1. Büyük Patlama Teorisi'ni ve evrenin oluşumunu açıklar." },
        { range: "02-06 Mart", displayMonth: "MART", topic: "12.4.2. Atom Altı Parçacıklar", outcome: "12.4.2.2. Atom altı parçacıkları standart modele göre sınıflandırır. (Kuarklar, Leptonlar)" },
        { range: "09-13 Mart", displayMonth: "MART", topic: "SINAV HAFTASI", outcome: "SINAV HAFTASI (2. Dönem 1. Sınav)" },
        { range: "16-20 Mart", displayMonth: "MART", topic: "2. DÖNEM ARA TATİLİ", outcome: "2. DÖNEM ARA TATİLİ" },
        { range: "23-27 Mart", displayMonth: "MART", topic: "12.4.3. Radyoaktivite", outcome: "12.4.3.1. Kararlı/kararsız atomları karşılaştırır. 12.4.3.2. Radyoaktif bozunmaları (alfa, beta, gama) açıklar." },
        { range: "30 Mart-03 Nisan", displayMonth: "NİSAN", topic: "12.4.3. Nükleer Enerji", outcome: "12.4.3.3. Fisyon ve füzyon reaksiyonlarını karşılaştırır." },
        { range: "06-10 Nisan", displayMonth: "NİSAN", topic: "12.5.1. Özel Görelilik", outcome: "12.5.1.1. Michelson-Morley deneyini açıklar. 12.5.1.2. Einstein'ın özel görelilik postulatlarını ifade eder." },
        { range: "13-17 Nisan", displayMonth: "NİSAN", topic: "12.5.1. Göreli Zaman ve Uzunluk", outcome: "12.5.1.3. Göreli zaman ve göreli uzunluk kavramlarını açıklar. (Kütle-Enerji Eşdeğerliği)" },
        { range: "20-24 Nisan", displayMonth: "NİSAN", topic: "12.5.2. Kuantum Fiziğine Giriş", outcome: "12.5.2.1. Siyah cisim ışımasını Planck hipotezi ile açıklar." },
        { range: "27 Nisan-01 Mayıs", displayMonth: "NİSAN", topic: "12.5.3. Fotoelektrik Olayı", outcome: "12.5.3.1. Foton kavramını ve fotoelektrik olayını açıklar." },
        { range: "04-08 Mayıs", displayMonth: "MAYIS", topic: "12.5.3. Fotoelektrik Olayı", outcome: "12.5.3.2. Fotoelektrik olayına ait matematiksel işlemleri yapar." },
        { range: "11-15 Mayıs", displayMonth: "MAYIS", topic: "12.5.4. Compton ve De Broglie", outcome: "12.5.4.1. Compton saçılmasını açıklar. 12.5.4.2. Işığın ikili doğasını ve De Broglie hipotezini açıklar." },
        { range: "18-22 Mayıs", displayMonth: "MAYIS", topic: "12.6. Modern Fizik Uygulamaları", outcome: "12.6.1.1. Görüntüleme teknolojilerini (MR, BT, Ultrason vb.) açıklar." },
        { range: "25-29 Mayıs", displayMonth: "MAYIS", topic: "12.6. Yarı İletkenler ve Süper İletkenler", outcome: "12.6.2.1. Yarı iletken teknolojisini (Diyot, Transistör, LED) açıklar. 12.6.3.1. Süper iletkenliği açıklar." },
        { range: "01-05 Haziran", displayMonth: "HAZİRAN", topic: "SINAV HAFTASI", outcome: "SINAV HAFTASI (2. Dönem 2. Sınav)" },
        { range: "08-12 Haziran", displayMonth: "HAZİRAN", topic: "12.6. Nanoteknoloji ve Lazer", outcome: "12.6.4.1. Nanoteknolojiyi açıklar. 12.6.5.1. Lazer ışığının elde edilişini açıklar." },
        { range: "15-19 Haziran", displayMonth: "HAZİRAN", topic: "Bilimsel Araştırma Merkezleri", outcome: "12.6.6.1. Bilimsel araştırma merkezlerinin (CERN, NASA, ESA, TAEK, ASELSAN, TÜBİTAK) görevlerini açıklar." },
        { range: "22-26 Haziran", displayMonth: "HAZİRAN", topic: "SOSYAL ETKİNLİK", outcome: "Yıl sonu etkinlikleri ve karne haftası." }
    ],
    'astro': [
        { range: "08-12 Eylül", displayMonth: "EYLÜL", topic: "Astronominin temel konusu", outcome: "1. Astronominin temel konusunu tanır. 2. İnsan olarak doğayı doğal olayları ve bir bütün olarak evreni anlamamızda astronomi biliminin önemini açıklar." },
        { range: "15-19 Eylül", displayMonth: "EYLÜL", topic: "Astronominin temel konusu", outcome: "1. Astronominin temel konusunu tanır. 2. İnsan olarak doğayı doğal olayları ve bir bütün olarak evreni anlamamızda astronomi biliminin önemini açıklar." },
        { range: "22-26 Eylül", displayMonth: "EYLÜL", topic: "Astronomi Tarihinde Bilim Adamları", outcome: "3. Astronominin insanların gereksinimleri sonucunda ortaya çıkan en eski bilim dalı olduğunu fark eder. 4. Astronomi tarihine damgasını vuran önemli bilim adamlarını tanır." },
        { range: "29 Eylül-03 Ekim", displayMonth: "EKİM", topic: "Astronomi ile Diğer Bilim Dalları Arasında ilişki", outcome: "5. Astronomi ile diğer bilim dalları arasında ilişki kurar. 6. Temel bilimlerden biri olan astronominin alt dallarını sıralar. 7. Gözlem ve kuramın astronomideki önemini fark eder." },
        { range: "06-10 Ekim", displayMonth: "EKİM", topic: "İnsan Gözünün Algılayamadığı Işınlar", outcome: "8. İnsan gözünün algılayamadığı ışınları tanır. 9. İnsan gözünün hangin ışınları algılayamadığını ve bu ışınların günlük hayatta nerelerde kullanıldığını açıklar." },
        { range: "13-17 Ekim", displayMonth: "EKİM", topic: "Teleskop Çeşitleri", outcome: "10. Astronomide kullanılan temel gözlem araçlarını tanır. 11. Teleskop çeşitlerini ve çalışma prensiplerini açıklar." },
        { range: "20-24 Ekim", displayMonth: "EKİM", topic: "Temel astronomik cisim ve sistemler", outcome: "1. Temel astronomik cisim ve sistemleri tanır. 2. Astronomik gözlemlerden yararlanarak zamanın göreli olduğunu açıklar" },
        { range: "27-31 Ekim", displayMonth: "EKİM", topic: "Gök ada Türleri (1. Dönem 1. Sınav)", outcome: "3. Gök ada türlerini ayırt eder." },
        { range: "03-07 Kasım", displayMonth: "KASIM", topic: "Karanlık Madde", outcome: "4. Evrenin geleceği bakımından karanlık maddenin önemini açıklar." },
        { range: "10-14 Kasım", displayMonth: "KASIM", topic: "1. Dönem Ara Tatili", outcome: "1. Dönem Ara Tatili" },
        { range: "17-21 Kasım", displayMonth: "KASIM", topic: "Samanyolu Gök adası", outcome: "5. Samanyolu gök adasını tanır Güneş sisteminin Samanyolu gök adası içerisindeki konumunu belirtilir. 6. Çıplak gözle gökyüzünü gözlemleyerek yıldızlar ile gezegenleri ayırt eder." },
        { range: "24-28 Kasım", displayMonth: "KASIM", topic: "Kepler Yasaları", outcome: "7. Kepler Yasalarını Güneş sistemindeki gezegenlere ve birbiri etrafında dolanan diğer gök cisimlerine uygular." },
        { range: "01-05 Aralık", displayMonth: "ARALIK", topic: "Iraksım Açısı", outcome: "8. Bir yıldızın ıraksım paralaks açısını kullanarak uzaklığını tahmin eder. 9. Görünür büyüklüğün fiziksel anlamını ve ıraksım açısıyla ilişkisini tanımlar." },
        { range: "08-12 Aralık", displayMonth: "ARALIK", topic: "Yıldızlar", outcome: "10. Yıldızların enerji üretim mekanizmasını açıklar. 11. Yıldızların evrimi ile biyolojik yaşam arasındaki ilişkiyi açıklar." },
        { range: "15-19 Aralık", displayMonth: "ARALIK", topic: "Kara delikler", outcome: "12. Kara delik kavramını açıklar. 13. Kara cisim ışımasının özelliklerini belirtilir" },
        { range: "22-26 Aralık", displayMonth: "ARALIK", topic: "Işıma ile görünür ışık şiddeti arasındaki farkı ayırt eder.", outcome: "14. Işıma ile görünür ışık şiddeti arasındaki farkı ayırt eder. 15. Kara cisim yaklaşımını kullanarak bir yıldızın sıcaklığını belirler." },
        { range: "29 Aralık-02 Ocak", displayMonth: "OCAK", topic: "Gök küre", outcome: "1. Gök küresi nin algısal bir kavram olduğunu açıklar. 2. Gök küresinin temel ögelerini sıralayarak açıklar." },
        { range: "05-09 Ocak", displayMonth: "OCAK", topic: "Takım Yıldızlar (1. Dönem 2. Sınav)", outcome: "3. Takımyıldızlarının astronomi açısından önemini belirtir. 4. Gök cisimlerinin günlük görünür hareketlerinin nedenini açıklar." },
        { range: "12-16 Ocak", displayMonth: "OCAK", topic: "Etkinlik Haftası", outcome: "Etkinlik Haftası" },
        { range: "19-23 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "26-30 Ocak", displayMonth: "OCAK", topic: "YARIYIL TATİLİ", outcome: "YARIYIL TATİLİ" },
        { range: "02-06 Şubat", displayMonth: "ŞUBAT", topic: "Küresel Kon Düzeneği", outcome: "5. Bir küresel kon düzeneği tasarlar. 6. Coğrafi koordinatları verilen bir noktayı model üzerinde bulur." },
        { range: "09-13 Şubat", displayMonth: "ŞUBAT", topic: "Gök küre", outcome: "7. Çevren düzleminin astronomik açıdan önemini ifade eder. 8. Gök küresi çizimlerinde gözlem yerine ait enlem bilgisini kullanır." },
        { range: "16-20 Şubat", displayMonth: "ŞUBAT", topic: "Eşlek Kon", outcome: "9. Eşlek kon düzeneğini şekil üzerinde tanımlar." },
        { range: "23-27 Şubat", displayMonth: "ŞUBAT", topic: "Gök Küre Çizimi", outcome: "10. Bir gözlem yerine ilişkin temsilî gök küresini çizerek gök cisimlerinin günlük görünür hareketlerini açıklar." },
        { range: "02-06 Mart", displayMonth: "MART", topic: "Bir boyutta hareketle Doğma batma koşullarını", outcome: "11. Doğma batma koşullarını çizim yardımıyla açıklar." },
        { range: "09-13 Mart", displayMonth: "MART", topic: "Güneşin yıllık Hareketi", outcome: "1. Güneşin yıllık hareketini açıklar. 2. Verilen herhangi bir tarih için Güneşin eşlek kon sayılarını yaklaşık olarak tahmin eder." },
        { range: "16-20 Mart", displayMonth: "MART", topic: "2. Dönem Ara Tatili", outcome: "2. Dönem Ara Tatili" },
        { range: "23-27 Mart", displayMonth: "MART", topic: "Ayın aylık Hareketi (2. Dönem 1. Sınav)", outcome: "3. Gündüz ve gece sürelerinin gözlem yerinin enlemi ve Güneşin dik açıklığı ile ilişkili olduğunu örneklerle açıklar. 4. Ayın aylık hareketini çizim yoluyla açıklar." },
        { range: "30 Mart-03 Nisan", displayMonth: "NİSAN", topic: "Ayın Evreleri", outcome: "5. Gök yüzündeki konumunun değişimini izleyerek Ayın aylık hareketinin açısal hızının değerini yaklaşık olarak belirler. 6. Ayın evrelerinin nasıl oluştuğunu şekil üzerinde gösterir." },
        { range: "06-10 Nisan", displayMonth: "NİSAN", topic: "Ay tutulması", outcome: "7. Ay tutulmasını açıklar." },
        { range: "13-17 Nisan", displayMonth: "NİSAN", topic: "Güneş Tutulması", outcome: "8. Güneş tutulmasını açıklar. 9. Ay ve Güneş tutulmalarının bilimsel açıdan önemini değerlendirir." },
        { range: "20-24 Nisan", displayMonth: "NİSAN", topic: "Dönemli olarak tekrarlayan her olay ile zamanın ölçülebileceğini fark eder", outcome: "1. Dönemli olarak tekrarlayan her olay ile zamanın ölçülebileceğini fark eder. 2. Yıldızıl gün ve gerçek Güneş gününü ayırt eder." },
        { range: "27 Nisan-01 Mayıs", displayMonth: "NİSAN", topic: "Güneş ve Yıldız Zamanları", outcome: "3. Güneş zamanı ile yıldız zamanı arasındaki ayrımı fark eder. 4. Günlük hayattaki kullanımı açısından ortalama Güneş zamanının yıldız zamanından daha uygun olduğunu ayırt eder." },
        { range: "04-08 Mayıs", displayMonth: "MAYIS", topic: "Yerel Zaman", outcome: "5. Bulunduğu yerin boylamı ile yerel zaman arasındaki ilişkiyi örneklerle açıklar. 6. Takvim kavramını açıklayarak Güneş ve ay takvimlerini ayırt eder." },
        { range: "11-15 Mayıs", displayMonth: "MAYIS", topic: "Takvimler", outcome: "7. Dünyada en çok kullanılan takvimleri sıralar. 8. Ekli yıl tanımındaki ölçütleri kullanarak verilen herhangi bir yılın ekli yıl olup olmadığını açıklar." },
        { range: "18-22 Mayıs", displayMonth: "MAYIS", topic: "Ekli Yıl Uzay Bilimleri", outcome: "1. Uzay bilimlerini astronomi ve diğer temel bilimlerle ilişkilendirir." },
        { range: "25-29 Mayıs", displayMonth: "MAYIS", topic: "Uzay Bilimleri", outcome: "2. Uzay bilimlerinin alt dallarını sıralayarak kapsamlarını açıklar. 3. Uzay çalışmalarının amaçlarını sıralar." },
        { range: "01-05 Haziran", displayMonth: "HAZİRAN", topic: "Uzay Çalışmaları (2. Dönem 2. Sınav)", outcome: "4. Uzay çalışmalarının gelişimini açıklar. 5. Uzay çalışmalarının yaşamımızdaki etkilerini örneklerle açıklar." },
        { range: "08-12 Haziran", displayMonth: "HAZİRAN", topic: "Uydular", outcome: "6. Uzay çalışmalarında kullanılan temel araçları tanır." },
        { range: "15-19 Haziran", displayMonth: "HAZİRAN", topic: "Uydular", outcome: "7. Uyduların yaşantımızdaki önemini fark eder." },
        { range: "22-26 Haziran", displayMonth: "HAZİRAN", topic: "Etkinlik Haftası", outcome: "Etkinlik Haftası" }
    ]
};

// 3. Helper to merge default plans with custom ones
export const getPlanData = (): PlanData => {
    // Varsayılan veriyi kopyalayarak başlat (Asla boş olamaz)
    const mergedData: PlanData = JSON.parse(JSON.stringify(DEFAULT_PLAN_DATA));
    
    try {
        const stored = localStorage.getItem(CUSTOM_PLANS_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            
            // Yeni Yapı: { meta: [], data: {} }
            if (parsed.data) {
                // ÖNEMLİ: Varsayılan anahtarları (9, 10, 11, 12, astro) ASLA ezme!
                Object.keys(parsed.data).forEach(key => {
                    // KORUMA: Sadece orijinalinde olmayanları ekle (Çakışma önleme)
                    if (!DEFAULT_PLAN_DATA.hasOwnProperty(key)) {
                        mergedData[key] = parsed.data[key];
                    }
                });
            }
        }
    } catch (e) {
        console.error("Error merging plan data", e);
    }
    return mergedData;
};

// Mutable PLAN_DATA to allow updates without reload
export const PLAN_DATA = getPlanData();

// Helper for loading custom meta
const loadCustomPlans = (): { meta: GradeOption[], data: PlanData } => {
    try {
        const stored = localStorage.getItem(CUSTOM_PLANS_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.meta && parsed.data) return parsed;
        }
    } catch (e) { console.error("Plan load error", e); }
    return { meta: [], data: {} };
};

const customInfo = loadCustomPlans();

// Combine Default Grades with Custom Grades
export let GRADES: GradeOption[] = [
    ...DEFAULT_GRADES,
    ...customInfo.meta
];

// Memory Updater Helper
const updateMemoryData = () => {
    const freshCustoms = loadCustomPlans();
    
    // Update GRADES array
    GRADES = [
        ...DEFAULT_GRADES,
        ...freshCustoms.meta
    ];

    // Update PLAN_DATA object (mutate keys)
    if (freshCustoms.data) {
        Object.keys(freshCustoms.data).forEach(key => {
             PLAN_DATA[key] = freshCustoms.data[key];
        });
    }

    // Trigger cleanup for deleted keys if necessary
    // (PLAN_DATA keys not in default and not in custom should be removed ideally, 
    // but simplified logic assumes additive mostly or reload on delete)
    
    // Return updated grades for consumers
    return GRADES;
};

export const getRefreshedGrades = () => {
    return updateMemoryData();
};

export const saveCustomPlan = (payload: { id: string, meta: GradeOption, data: LessonPlan[] }) => {
    const currentCustoms = loadCustomPlans();
    
    currentCustoms.data[payload.id] = payload.data;
    
    const metaIdx = currentCustoms.meta.findIndex(m => m.id === payload.id);
    if (metaIdx > -1) {
        currentCustoms.meta[metaIdx] = payload.meta;
    } else {
        currentCustoms.meta.push(payload.meta);
    }
    
    localStorage.setItem(CUSTOM_PLANS_KEY, JSON.stringify(currentCustoms));
    
    // NO RELOAD - Update memory and dispatch event
    updateMemoryData();
    window.dispatchEvent(new Event('plan-data-change'));
};

export const deleteCustomPlan = (id: string) => {
    const currentCustoms = loadCustomPlans();
    
    delete currentCustoms.data[id];
    const newMeta = currentCustoms.meta.filter(m => m.id !== id);
    
    localStorage.setItem(CUSTOM_PLANS_KEY, JSON.stringify({
        data: currentCustoms.data,
        meta: newMeta
    }));
    
    // Cleanup associated progress/notes
    try {
        const completion = JSON.parse(localStorage.getItem('planTrackerCompletion_v2') || '{}');
        delete completion[id];
        localStorage.setItem('planTrackerCompletion_v2', JSON.stringify(completion));
        
        const notes = JSON.parse(localStorage.getItem('planTrackerNotes_v1') || '{}');
        delete notes[id];
        localStorage.setItem('planTrackerNotes_v1', JSON.stringify(notes));
    } catch(e) {}

    // NO RELOAD - Update memory and dispatch event
    // Manually remove key from memory PLAN_DATA since updateMemoryData is additive
    delete PLAN_DATA[id];
    updateMemoryData();
    window.dispatchEvent(new Event('plan-data-change'));
};

const monthMap: { [key: string]: number } = {
    'OCAK': 0, 'ŞUBAT': 1, 'MART': 2, 'NİSAN': 3, 'MAYIS': 4, 'HAZİRAN': 5,
    'TEMMUZ': 6, 'AĞUSTOS': 7, 'EYLÜL': 8, 'EKİM': 9, 'KASIM': 10, 'ARALIK': 11,
    'EKIM': 9, 'NISAN': 3, 'AGUSTOS': 7, 'EYLUL': 8
};

function getCurrentAcademicStartYear(): number {
    const now = new Date();
    const month = now.getMonth(); 
    const year = now.getFullYear();
    if (month > 6) return year;
    return year - 1;
}

function getYearForMonth(monthIndex: number) {
    const startYear = getCurrentAcademicStartYear();
    return monthIndex >= 8 ? startYear : startYear + 1;
}

export function parseDateRange(rangeStr: string): [Date, Date] {
    if (!rangeStr) return [new Date(), new Date()];
    
    const normalized = rangeStr.replace(/\u00A0/g, ' ').trim();
    const parts = normalized.split(/[-–]/).map(s => s.trim());
    
    if (parts.length !== 2) {
        return [new Date(), new Date()];
    }

    const parsePart = (part: string, fallbackMonth?: string): { day: number, monthIndex: number, monthRaw: string } => {
        const dayMatch = part.match(/(\d{1,2})/); 
        if (!dayMatch) throw new Error(`Invalid day in: ${part}`);
        const day = parseInt(dayMatch[1], 10);

        let monthRaw = part.replace(/[0-9]/g, '').replace(/Hafta|:/gi, '').trim();
        
        if (!monthRaw && fallbackMonth) {
            monthRaw = fallbackMonth;
        } 

        const monthName = monthRaw ? monthRaw.toLocaleUpperCase('tr-TR') : '';
        let monthIndex = monthMap[monthName];
        if (monthIndex === undefined && monthRaw) monthIndex = monthMap[monthRaw.toUpperCase()];
        
        if (monthIndex === undefined && fallbackMonth) {
             const fbName = fallbackMonth.toLocaleUpperCase('tr-TR');
             return { day, monthIndex: monthMap[fbName] || 8, monthRaw: fallbackMonth };
        }
        
        return { day, monthIndex: monthIndex ?? 8, monthRaw: monthRaw || '' };
    };

    try {
        const end = parsePart(parts[1]);
        const endYear = getYearForMonth(end.monthIndex);
        const endDate = new Date(endYear, end.monthIndex, end.day, 23, 59, 59, 999);

        const start = parsePart(parts[0], end.monthRaw);
        const startYear = getYearForMonth(start.monthIndex);
        const startDate = new Date(startYear, start.monthIndex, start.day, 0, 0, 0, 0);

        return [startDate, endDate];
    } catch (e) {
        return [new Date(), new Date()];
    }
}

export function findCurrentWeekIndex(plan: any[], date: Date = new Date()): number {
    if (!plan || plan.length === 0) return 0;

    const now = new Date(date);
    now.setHours(0, 0, 0, 0);

    for (let i = 0; i < plan.length; i++) {
        try {
            const [startDate, endDate] = parseDateRange(plan[i].range);
            const endCheck = new Date(endDate);
            endCheck.setHours(23, 59, 59, 999);

            if (now <= endCheck) {
                return i;
            }
        } catch (e) {}
    }
    return plan.length - 1;
}

export function getPassedWeekCount(plan: any[], date: Date = new Date()): number {
    const now = new Date(date);
    let passedCount = 0;

    for (let i = 0; i < plan.length; i++) {
        try {
            const [startDate, endDate] = parseDateRange(plan[i].range);
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) break;

            const endCheck = new Date(endDate);
            endCheck.setHours(23, 59, 59, 999);

            if (now > endCheck) {
                passedCount++;
            } else {
                break;
            }
        } catch (e) {
            break;
        }
    }
    return passedCount;
}
